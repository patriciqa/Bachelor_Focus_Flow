import BreakActivities from "@/component/settings/activities/BreakActivities";
import ReasonsOverview from "@/component/settings/causes/ReasonsOverview";
import { Modal } from "@/component/transitions/Modal";
import { SettingComponent } from "@/types/Components";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import ExamPhaseOverview from "../../component/settings/ExamPhaseOverview";

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
        component = <ExamPhaseOverview setShowComponent={setShowComponent} />;
        break;
      case SettingComponent.GOOD_REASONS:
        component = <ReasonsOverview good={true} />;
        break;
      case SettingComponent.BAD_REASONS:
        component = <ReasonsOverview good={false} />;
        break;
      case SettingComponent.BAD_REASONS:
        component = <ReasonsOverview good={false} />;
        break;
      case SettingComponent.BREAK_ACTIVITIES:
        component = <BreakActivities />;
        break;
    }
    return component;
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <div>Settings</div>
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
          setShowComponent(SettingComponent.GOOD_REASONS);
        }}
      >
        Good Reasons
      </button>{" "}
      <button
        onClick={() => {
          setOpen(true);
          setShowComponent(SettingComponent.BAD_REASONS);
        }}
      >
        Bad Reasons
      </button>{" "}
      <button
        onClick={() => {
          setOpen(true);
          setShowComponent(SettingComponent.BREAK_ACTIVITIES);
        }}
      >
        Break activities
      </button>
      <AnimatePresence>
        {open && (
          <Modal onClose={() => setOpen(false)}>
            <button
              className=""
              onClick={() => setShowComponent(SettingComponent.NO_COMPONENT)}
            >
              Back
            </button>
            {showPage() !== null ? showPage() : setOpen(false)}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
