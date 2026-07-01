import { getCurrentWindow } from "@tauri-apps/api/window";
import { Component, For } from "solid-js";

type Direction =
  | "North"
  | "East"
  | "South"
  | "West"
  | "NorthEast"
  | "NorthWest"
  | "SouthEast"
  | "SouthWest";

const Handles: { direction: Direction; class: string }[] = [
  { direction: "North", class: "top-0 right-2 left-2 h-1 cursor-ns-resize" },
  { direction: "South", class: "right-2 bottom-0 left-2 h-1 cursor-ns-resize" },
  { direction: "West", class: "top-2 bottom-2 left-0 w-1 cursor-ew-resize" },
  { direction: "East", class: "top-2 right-0 bottom-2 w-1 cursor-ew-resize" },
  { direction: "NorthWest", class: "top-0 left-0 h-2 w-2 cursor-nwse-resize" },
  { direction: "NorthEast", class: "top-0 right-0 h-2 w-2 cursor-nesw-resize" },
  { direction: "SouthWest", class: "bottom-0 left-0 h-2 w-2 cursor-nesw-resize" },
  { direction: "SouthEast", class: "right-0 bottom-0 h-2 w-2 cursor-nwse-resize" },
];

export const ResizeHandles: Component = () => {
  const appWindow = getCurrentWindow();

  return (
    <For each={Handles}>
      {(handle) => (
        <div
          class={`fixed z-50 ${handle.class}`}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            appWindow.startResizeDragging(handle.direction);
          }}
        />
      )}
    </For>
  );
};
