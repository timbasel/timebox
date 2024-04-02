import { Component } from "solid-js";
import { Chat } from "./components/chat";
import { Details } from "./components/details";

export const InboxPage: Component = () => {
  return (
    <div class="flex h-full w-full py-4">
      <Chat />
      <Details />
    </div>
  );
};
