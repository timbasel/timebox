/* @refresh reload */

import { debounce } from "@solid-primitives/scheduled";
import { Navigate, RouteDefinition, Router } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import { render } from "solid-js/web";

import { OnResize } from "wails/go/backend/App";
import { NavBar } from "./core/ui/navbar";
import { InboxPage } from "./inbox/page";
import "./style.css";

const App: ParentComponent = (props) => {
  window.onresize = debounce(() => OnResize(), 500);

  return (
    <div class="flex w-screen h-screen bg-stone-800 text-stone-50">
      <NavBar />
      <main class="min-w-0 flex-col w-full">{props.children}</main>
    </div>
  );
};

const Routes: RouteDefinition[] = [
  { path: "/", component: () => <Navigate href="/inbox" /> },
  { path: "/inbox", component: InboxPage },
  { path: "/*", component: () => <div>Not Found</div> },
];

render(() => <Router root={App}>{Routes}</Router>, document.getElementById("root") as HTMLElement);
