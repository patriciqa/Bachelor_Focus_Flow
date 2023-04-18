import ExampPhaseInput from "@/component/overview/settings/ExamPhaseInput";
import Settings from "@/component/overview/settings/Settings";
import Statistics from "@/component/overview/Statistics";
import { PageComponent } from "@/types/Timer";
import React, { useEffect, useState } from "react";
import IndexedDb from "../component/archive/IndexedDb";

const Overview = () => {
  const [showComponent, setShowComponent] = useState<PageComponent>(
    PageComponent.OVERVIEW
  );
  const showPage = (): React.ReactElement => {
    let component;
    switch (showComponent) {
      case PageComponent.OVERVIEW:
        component = <Statistics setShowComponent={setShowComponent} />;
        break;
      case PageComponent.SETTINGS_EXAMPHASES:
        component = <ExampPhaseInput setShowComponent={setShowComponent} />;
        break;
      case PageComponent.SETTINGS:
        component = <Settings setShowComponent={setShowComponent} />;
        break;
      default:
        component = <Statistics setShowComponent={setShowComponent} />;
    }
    return component;
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen">
        {showPage()}
      </div>
    </>
  );
};
export default Overview;
