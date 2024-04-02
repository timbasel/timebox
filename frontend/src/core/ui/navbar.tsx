import { A, useMatch } from "@solidjs/router";
import { FaRegularClock, FaSolidInbox } from "solid-icons/fa";
import { Component, ComponentProps, ParentComponent } from "solid-js";
import { twMerge } from "tailwind-merge";

const NavLink: ParentComponent<ComponentProps<typeof A>> = (props) => {
  const match = useMatch(() => props.href);

  return (
    <div class="relative flex">
      <A
        {...props}
        class={twMerge(
          "p-4 hover:bg-black/20 text-stone-400 hover:text-stone-50 border-b border-stone-700",
          props.class
        )}
      />
      <div
        class={twMerge("absolute top-0 w-0.5 h-full", match() ? "bg-stone-50" : "bg-transparent")}
      />
    </div>
  );
};

export const NavBar: Component = () => {
  return (
    <nav class="h-full ml-[1px] border-r border-stone-700 text-xl">
      <div class="flex flex-col">
        <NavLink href="/inbox" title="Inbox">
          <FaSolidInbox />
        </NavLink>
        <NavLink href="/clock" title="Clock">
          <FaRegularClock />
        </NavLink>
      </div>
    </nav>
  );
};
