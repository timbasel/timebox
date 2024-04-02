import { FaSolidPaperPlane } from "solid-icons/fa";
import { Component } from "solid-js";
import { Input } from "~/core/ui/input";

export const Chat: Component = () => {
  return (
    <div class="w-full h-full flex flex-col p-4">
      <div class="flex-grow min-h-0"></div>
      <div class="w-full">
        <Input placeholder="New Entry...">
          <div class="h-full p-2 text-xl aspect-auto cursor-pointer hover:bg-black/20 rounded-lg">
            <FaSolidPaperPlane />
          </div>
        </Input>
      </div>
    </div>
  );
};
