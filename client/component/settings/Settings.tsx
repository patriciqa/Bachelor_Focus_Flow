import { SettingComponent } from "@/types/Components";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Pop } from "../transitions/Pop";
import ReasonsOverview from "./causes/ReasonsOverview";
import ExamPhaseOverview from "./exam-phase/ExamPhaseOverview";

const Settings = (): React.ReactElement => {
  let [open, setOpen] = useState(false);
  let [showComponent, setShowComponent] = useState(
    SettingComponent.NO_COMPONENT
  );
  
  const showPage = (): React.ReactElement | null => {
    let component = null;
    switch (showComponent) {
      case SettingComponent.NO_COMPONENT:
        component = null;
        break;
      case SettingComponent.EXAMPHASE_OVERVIEW:
        component = <ExamPhaseOverview />;
        break;
      case SettingComponent.CAUSES_OVERVIEW:
        component = <ReasonsOverview />;
        break;
    }
    return component;
  };
  return (
    <div className="flex flex-col ">
      <div>settings</div>
      <button
        onClick={() => {
          setOpen(true);
          setShowComponent(SettingComponent.EXAMPHASE_OVERVIEW);
        }}
      >
        Exam Phases
      </button>{" "}
      <button
        onClick={() => {
          setOpen(true);
          setShowComponent(SettingComponent.CAUSES_OVERVIEW);
        }}
      >
        Reasons
      </button>{" "}
      <button
        onClick={() => {
          setOpen(true);
          setShowComponent(SettingComponent.CAUSES_OVERVIEW);
        }}
      >
        Break activities
      </button>
      <AnimatePresence>
        {open && (
          <Pop onClose={() => setOpen(false)}>
            <button
              className=""
              onClick={() => setShowComponent(SettingComponent.NO_COMPONENT)}
            >
              Back
            </button>
            {/* <ExamPhaseOverview /> */}
            {showPage() !== null ? showPage() : setOpen(false)}
          </Pop>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
