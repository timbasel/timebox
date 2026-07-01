import { A } from "@solidjs/router";
import { FaSolidClock } from "solid-icons/fa";
import { Component, ComponentProps } from "solid-js";

const NavBarItem: Component<ComponentProps<typeof A>> = (props) => {
  return (
    <A
      {...props}
      class="border-l-3 border-transparent p-4 text-2xl hover:bg-white/10 active:bg-white/20"
      activeClass="border-white bg-neutral-950 shadow-xl"
    />
  );
};

export const NavBar: Component = () => {
  return (
    <div class="flex h-full flex-col bg-neutral-800 shadow-md shadow-black">
      <NavBarItem href="/timer">
        <FaSolidClock />
      </NavBarItem>
    </div>
  );
};
