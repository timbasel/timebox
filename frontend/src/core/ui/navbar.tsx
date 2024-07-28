import { A, useMatch } from "@solidjs/router";
import {
  FaRegularCalendarCheck,
  FaRegularClock,
  FaSolidEye,
  FaSolidGear,
  FaSolidInbox,
  FaSolidLightbulb,
  FaSolidListCheck,
} from "solid-icons/fa";
import { Component, ComponentProps, ParentComponent } from "solid-js";
import { twMerge } from "tailwind-merge";

const NavLink: ParentComponent<ComponentProps<typeof A>> = (props) => {
  const match = useMatch(() => props.href);

  return (
    <div class={twMerge("relative flex border-b border-stone-700", props.class)}>
      <A
        {...props}
        class={twMerge(
          "p-4 hover:bg-black/20 hover:text-stone-50",
          match() ? "text-stone-50" : "text-stone-400"
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
    <nav class="h-full ml-[1px] border-r border-stone-700 text-xl  flex flex-col">
      <NavLink href="/inbox" title="Inbox">
        <FaSolidInbox />
      </NavLink>
      <NavLink href="/tasks" title="Tasks">
        <FaRegularCalendarCheck />
      </NavLink>
      <NavLink href="/notes" title="Notes">
        <FaSolidLightbulb />
      </NavLink>
      <NavLink href="/projects" title="Projects">
        <FaSolidListCheck />
      </NavLink>
      <NavLink href="/today" title="Today">
        <FaRegularClock />
      </NavLink>
      <NavLink href="/review" title="Review">
        <FaSolidEye />
      </NavLink>
      <NavLink class="mt-auto border-t" href="/settings" title="Settings">
        <FaSolidGear />
      </NavLink>
    </nav>
  );
};
