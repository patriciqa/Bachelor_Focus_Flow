import { Switch } from "@headlessui/react";
import { useState } from "react";

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="grid place-items-center">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-break" : "bg-study"}
          relative inline-flex h-[38px] w-[200px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>

        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-[93px]" : "translate-x-0"}
           z-0 pointer-events-none inline-block h-[34px] w-[100px] absolute transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        ></span>
        <button onClick={() => console.log("break")} className="translate-x-0">
          break
        </button>
        <button className="translate-x-[80px] z--3">study</button>
      </Switch>
    </div>
  );
}
