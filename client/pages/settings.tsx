import BreakActivityOverview from "@/component/settings/activities/BreakActivityOverview";
import PopPage from "@/component/settings/reasons/PopPage";
import ReasonsOverview from "@/component/settings/reasons/ReasonsOverview";
import { SettingComponent } from "@/types/Components";
import { WhichTimer } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  return (
    <div className="flex flex-col w-screen h-[100vh]  bg-background fixed p-4">
      <div className="pt-10 text-chartGrey text-h16">
        manage your exam phases
      </div>
      <button
        className="flex py-2 text-h20 "
        onClick={() => {
          setOpen(true);
          setShowComponent(SettingComponent.EXAMPHASE_OVERVIEW);
        }}
      >
        <div className="flex justify-between w-[90vw] py-2">
          {initialRenderComplete && (
            <>
              <div> exam phases</div>
              <FontAwesomeIcon icon={["fas", "arrow-right-long"]} size="xl" />
            </>
          )}
        </div>
      </button>
      <div className="pt-8 text-chartGrey text-h16">
        edit your causes and activities list
      </div>
      <button
        onClick={() => {
          setOpen(true);
          setShowComponent(SettingComponent.GOOD_REASONS);
        }}
      >
        <div className="flex justify-between w-[90vw] py-2">
          {initialRenderComplete && (
            <>
              <div> positive study causes</div>
              <FontAwesomeIcon icon={["fas", "arrow-right-long"]} size="xl" />
            </>
          )}
        </div>
      </button>
      <button
        onClick={() => {
          setOpen(true);
          setShowComponent(SettingComponent.BAD_REASONS);
        }}
      >
        <div className="flex justify-between w-[90vw] py-2">
          {initialRenderComplete && (
            <>
              <div> negative study causes</div>
              <FontAwesomeIcon icon={["fas", "arrow-right-long"]} size="xl" />
            </>
          )}
        </div>
      </button>{" "}
      <button
        onClick={() => {
          setOpen(true);
          setShowComponent(SettingComponent.BREAK_ACTIVITIES);
        }}
      >
        <div className="flex justify-between w-[90vw] py-2">
          {initialRenderComplete && (
            <>
              <div> break activities</div>
              <FontAwesomeIcon icon={["fas", "arrow-right-long"]} size="xl" />
            </>
          )}
        </div>
      </button>
      {showComponent !== SettingComponent.NO_COMPONENT && (
        <PopPage open={open} setOpen={setOpen} component={showPage()} />
      )}
    </div>
  );
};

export default Settings;
