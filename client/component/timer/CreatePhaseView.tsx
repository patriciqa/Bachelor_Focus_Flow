import CreateExamPhase from "@/component/settings/CreateExamPhase";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Pop } from "../transitions/Pop";

export default function CreatePhaseView() {
  let [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-center">
        <p>Start a new exam phase to track your data.</p>
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
              <CreateExamPhase setOpen={setOpen} />
            </Pop>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
