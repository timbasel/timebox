import { Component, mergeProps, Show } from "solid-js";
import { twMerge } from "tailwind-merge";

const formatTime = (totalSeconds: number): string => {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export type ClockProps = {
  seconds: number;
  progress: number;
  label?: string;
  class?: string;
  stroke?: number;
};

const ViewBox = 100;
const Center = ViewBox / 2;

export const Clock: Component<ClockProps> = (baseProps) => {
  const props = mergeProps({ stroke: 5, class: "stroke-neutral-50" }, baseProps);
  const radius = () => (ViewBox - props.stroke) / 2;
  const circumference = () => 2 * Math.PI * radius();

  return (
    <svg
      viewBox={`0 0 ${ViewBox} ${ViewBox}`}
      class="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform={`rotate(-90 ${Center} ${Center})`}>
        <circle
          cx={Center}
          cy={Center}
          r={radius()}
          fill="none"
          stroke-width={props.stroke}
          class="stroke-neutral-800"
        />
        <circle
          cx={Center}
          cy={Center}
          r={radius()}
          fill="none"
          stroke-width={props.stroke}
          stroke-linecap="square"
          class={twMerge(props.class, "transition-[stroke-dashoffset] duration-1000 ease-linear")}
          stroke-dasharray={`${circumference()}`}
          stroke-dashoffset={`${circumference() * (1 - props.progress)}`}
        />
      </g>
      <Show when={props.label}>
        <text
          x={Center}
          y={Center - 12}
          text-anchor="middle"
          dominant-baseline="middle"
          class="fill-neutral-200 text-[6px] font-light tracking-[1px] uppercase"
        >
          {props.label}
        </text>
      </Show>
      <text
        x={Center}
        y={Center + 6}
        text-anchor="middle"
        dominant-baseline="middle"
        class="fill-neutral-50 text-[24px] font-extralight tabular-nums"
      >
        {formatTime(props.seconds)}
      </text>
    </svg>
  );
};
