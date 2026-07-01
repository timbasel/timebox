import { getCurrentWindow } from "@tauri-apps/api/window";
import { FaSolidXmark } from "solid-icons/fa";
import { Component } from "solid-js";

export const TitleBar: Component = () => {
  const appWindow = getCurrentWindow();

  return (
    <header
      data-tauri-drag-region
      class="flex shrink-0 items-center justify-between border-b border-neutral-700 bg-neutral-950 p-0.5 select-none"
    >
      <div></div>
      <button
        aria-label="Close"
        onClick={() => appWindow.close()}
        class="flex aspect-square h-full items-center justify-center rounded-full p-1.5 text-xs text-neutral-400 hover:bg-neutral-700 hover:text-neutral-100 active:bg-red-900"
      >
        <FaSolidXmark />
      </button>
    </header>
  );
};
