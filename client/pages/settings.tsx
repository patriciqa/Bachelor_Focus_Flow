import { ColorType } from "@/component/CancellButton";
import BreakActivityOverview from "@/component/settings/activities/BreakActivityOverview";
import ModalPage from "@/component/settings/reasons/ModalPage";
import ReasonsOverview from "@/component/settings/reasons/ReasonsOverview";
import { SettingComponent } from "@/types/Components";
import { WhichTimer } from "@/types/Timer";
import React, { useEffect, useRef, useState } from "react";
import ExamPhaseOverview from "../component/settings/ExamPhaseOverview";

const Settings = ({
  setWhichTimer,
}: {
  setWhichTimer: (d: WhichTimer) => void;
}): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [showComponent, setShowComponent] = useState(
    SettingComponent.NO_COMPONENT
  );

  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(new URL("../worker.ts", import.meta.url));
    workerRef.current.onmessage = (event: MessageEvent<number>) =>
      alert(`WebWorker Response => ${event.data}`);
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const showPage = (): React.ReactElement => {
    let component = null;
    switch (showComponent) {
      case SettingComponent.EXAMPHASE_OVERVIEW:
        component = (
          <ExamPhaseOverview
            setShowComponent={setShowComponent}
            setWhichTimer={setWhichTimer}
          />
        );
        break;
      case SettingComponent.GOOD_REASONS:
        component = <ReasonsOverview good={true} />;
        break;
      case SettingComponent.BAD_REASONS:
        component = <ReasonsOverview good={false} />;
        break;
      case SettingComponent.BREAK_ACTIVITIES:
        component = <BreakActivityOverview />;
        break;
      default:
        component = <div />;
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
      </button>
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
      {showComponent !== SettingComponent.NO_COMPONENT && (
        <ModalPage
          colorType={ColorType.NEUTRAL}
          open={open}
          setOpen={setOpen}
          component={showPage()}
        />
      )}
    </div>
  );
};

export default Settings;
