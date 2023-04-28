import CreateExamPhase from "@/pages/settings/exam-phase/CreateExamPhase";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Pop } from "../transitions/Pop";

export default function CreatePhaseView() {
  let [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-center">
        <p>Start a new exam phase to track your data.</p>
        {/* <button onClick={() => { } }>Create Exam Phase</button>
      button
      onClick={() => {
        setOpen(true);
        // setShowComponent(SettingComponent.CAUSES_OVERVIEW);
      // } 
      > */}
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Create exam phase
        </button>
        <AnimatePresence>
          {open && (
            <Pop onClose={() => setOpen(false)}>
              {/* <button
              className=""
              onClick={() => setShowComponent(SettingComponent.NO_COMPONENT)}
            >
              Back
            </button> */}
              {/* <ExamPhaseOverview /> */}
              <CreateExamPhase />
            </Pop>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
