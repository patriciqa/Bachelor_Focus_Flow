import IndexedDb from "@/component/archive/IndexedDb";
import { PageComponent } from "@/types/Timer";
import React, { useEffect } from "react";

const Settings = ({
  setShowComponent,
}: {
  setShowComponent: (d: PageComponent) => void;
}): React.ReactElement => {
  return (
    <div>
      <div>settings</div>
      <button
        className="bg-tahiti"
        onClick={() => setShowComponent(PageComponent.SETTINGS_EXAMPHASES)}
      >
        Exam Phases
      </button>
    </div>
  );
};

export default Settings;
