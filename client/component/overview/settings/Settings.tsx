import IndexedDb from "@/component/archive/IndexedDb";
import { OverviewContext } from "@/component/context/OverviewContext";
import { PageComponent } from "@/types/Timer";
import React, { useContext, useEffect } from "react";

const Settings = (): React.ReactElement => {
  const { setShowComponent } = useContext(OverviewContext);

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
