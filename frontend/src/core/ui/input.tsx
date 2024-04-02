import { ComponentProps, ParentComponent, Show, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

export const Input: ParentComponent<{ label?: string } & ComponentProps<"textarea">> = (props) => {
  const [, htmlProps] = splitProps(props, ["label", "class", "placeholder"]);
  return (
    <div class="relative rounded-2xl border border-stone-300 flex items-center shadow-inset-2dp">
      <textarea
        {...htmlProps}
        id={props.label}
        class={twMerge(
          "peer w-full bg-transparent outline-none p-3 overflow-hidden resize-none",
          props.label ? "pt-5" : ""
        )}
        rows={1}
        placeholder={props.label ? " " : props.placeholder}
        onInput={(e) => {
          e.currentTarget.style.height = "";
          e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
        }}
      />
      <Show when={props.label}>
        <label
          for={props.label}
          class="absolute left-2 top-4 z-10 origin-[0] -translate-y-3 text-xs text-white  transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:-translate-y-3 peer-focus:text-xs"
        >
          {props.label}
        </label>
      </Show>
      <div class="mx-2">{props.children}</div>
    </div>
  );
};
