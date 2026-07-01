import { Component, ComponentProps } from "solid-js";
import { twMerge } from "tailwind-merge";

export const Button: Component<ComponentProps<"button">> = (props) => {
  return (
    <button
      {...props}
      class={twMerge(
        props.class,
        "flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-800 px-6 py-3 font-medium hover:bg-neutral-700 active:bg-neutral-950",
      )}
    />
  );
};
