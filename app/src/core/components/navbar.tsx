import { A } from "@solidjs/router";
import { FaSolidClock } from "solid-icons/fa";
import { Component, ComponentProps } from "solid-js";

const NavBarItem: Component<ComponentProps<typeof A>> = (props) => {
  return (
    <A
      {...props}
      class="border-l-3 border-transparent p-4 text-2xl hover:bg-white/5 active:bg-white/10"
      activeClass="border-white bg-neutral-950 shadow-xl"
    />
  );
};

export const NavBar: Component = () => {
  return (
    <div class="flex h-full flex-col border-r border-neutral-700 bg-neutral-900 shadow-md shadow-black">
      <NavBarItem href="/timer">
        <FaSolidClock />
      </NavBarItem>
    </div>
  );
};
