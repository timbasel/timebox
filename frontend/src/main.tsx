/* @refresh reload */
import { ParentComponent } from "solid-js";
import { render } from "solid-js/web";

import "./style.css";

const App: ParentComponent = (props) => {
  return (
    <div class="flex h-screen w-screen select-none flex-col bg-stone-800 text-stone-50">
      <main>{props.children}</main>
    </div>
  );
};

render(() => <App />, document.getElementById("root") as HTMLElement);
