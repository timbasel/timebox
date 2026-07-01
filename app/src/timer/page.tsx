import { FaSolidPlay, FaSolidMugHot, FaSolidStop } from "solid-icons/fa";
import { Component, createSignal, onCleanup, Show } from "solid-js";

import { Clock } from "~/core/components";

type Mode = "idle" | "work" | "break";

const breakForWork = (workSeconds: number): number => {
  const minutes = workSeconds / 60;
  if (minutes <= 25) return 5 * 60;
  if (minutes <= 45) return 8 * 60;
  if (minutes <= 90) return 10 * 60;
  return 15 * 60;
};

export const TimerPage: Component = () => {
  const [mode, setMode] = createSignal<Mode>("idle");
  const [timer, setTimer] = createSignal(0);
  const [breakTotal, setBreakTotal] = createSignal(0);

  let interval: ReturnType<typeof setInterval> | undefined;

  const stopInterval = () => {
    if (interval !== undefined) {
      clearInterval(interval);
      interval = undefined;
    }
  };
  onCleanup(stopInterval);

  const startWork = () => {
    stopInterval();
    setMode("work");
    setTimer(0);
    interval = setInterval(() => setTimer((s) => s + 1), 1000);
  };

  const startBreak = () => {
    stopInterval();
    const length = breakForWork(timer());
    setMode("break");
    setTimer(length);
    setBreakTotal(length);
    interval = setInterval(() => {
      setTimer((s) => {
        if (s <= 1) {
          stopInterval();
          setMode("idle");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const reset = () => {
    stopInterval();
    setMode("idle");
    setTimer(0);
    setBreakTotal(0);
  };

  const progress = () => {
    switch (mode()) {
      case "work":
        return Math.min(timer() / (45 * 60), 1);
      case "break":
        return breakTotal() > 0 ? timer() / breakTotal() : 0;
      default:
        return 0;
    }
  };

  const label = () => {
    switch (mode()) {
      case "idle":
        return "Ready";
      case "work":
        return "Focus";
      case "break":
        return "Break";
    }
  };

  return (
    <div class="flex h-full flex-col items-center justify-center gap-10">
      <div class="h-80 max-h-[80%] w-80 max-w-[80%]">
        <Clock seconds={timer()} progress={progress()} label={label()} />
      </div>

      <div class="flex items-center gap-4">
        <Show
          when={mode() === "work"}
          fallback={
            <button
              onClick={startWork}
              class="flex items-center gap-2 rounded-lg bg-sky-900 px-6 py-3 font-medium hover:bg-sky-800 active:bg-sky-700"
            >
              <FaSolidPlay /> Start work
            </button>
          }
        >
          <button
            onClick={startBreak}
            class="flex items-center gap-2 rounded-lg bg-emerald-800 px-6 py-3 font-medium hover:bg-emerald-700 active:bg-emerald-900"
          >
            <FaSolidMugHot /> Start break
          </button>
        </Show>

        <Show when={mode() !== "idle"}>
          <button
            onClick={reset}
            class="flex items-center gap-2 rounded-lg bg-neutral-700 px-6 py-3 font-medium hover:bg-neutral-600 active:bg-neutral-800"
          >
            <FaSolidStop /> Reset
          </button>
        </Show>
      </div>
    </div>
  );
};
