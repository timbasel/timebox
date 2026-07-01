/* @refresh reload */
import { Navigate, RouteDefinition, Router } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import { render } from "solid-js/web";

import "~/style.css";
import { NavBar } from "~/core/components";

const App: ParentComponent = (props) => {
  return (
    <div class="flex h-screen w-screen bg-neutral-950 text-neutral-200">
      <NavBar />
      <main class="grow p-4">{props.children}</main>
    </div>
  );
};

const Routes: RouteDefinition[] = [
  { path: "/", component: () => <Navigate href="/inbox" /> },
  { path: "/inbox", component: () => "Inbox" },
  { path: "/timer", component: () => "Timer" },
];

render(() => <Router root={App}>{Routes}</Router>, document.getElementById("root") as HTMLElement);
