import { FaSolidPlay, FaSolidMugHot, FaSolidStop } from "solid-icons/fa";
import { Component, createSignal, onCleanup, Show } from "solid-js";

import Bell from "@/audio/bell.ogg";
import { Button, Clock } from "~/core/components";

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

  const bell = new Audio(Bell);

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
      const remaining = timer() - 1;
      if (remaining <= 0) {
        onBreakEnd();
        return;
      }
      setTimer(remaining);
    }, 1000);
  };

  const onBreakEnd = () => {
    bell.currentTime = 0;
    bell.play();

    startWork();
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
    <div class="flex h-full flex-col items-center justify-center gap-10 overflow-hidden">
      <div class="h-4/5 max-h-100 w-4/5 max-w-100">
        <Clock seconds={timer()} progress={progress()} label={label()} />
      </div>

      <div class="flex items-center gap-4">
        <Show
          when={mode() === "work"}
          fallback={
            <Button onClick={startWork}>
              <FaSolidPlay /> Start Work
            </Button>
          }
        >
          <Button onClick={startBreak}>
            <FaSolidMugHot /> Start Break
          </Button>
        </Show>

        <Show when={mode() !== "idle"}>
          <Button onClick={reset}>
            <FaSolidStop /> Reset
          </Button>
        </Show>
      </div>
    </div>
  );
};
