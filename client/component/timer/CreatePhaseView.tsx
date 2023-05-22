import CreateExamPhase from "@/component/settings/CreateExamPhase";
import { WhichTimer } from "@/types/Timer";
import { useState } from "react";
import { ColorType } from "../CancellButton";
import ModalPage from "../settings/reasons/ModalPage";

export default function CreatePhaseView({
  setWhichTimer,
}: {
  setWhichTimer: (d: WhichTimer) => void;
}) {
  const [open, setOpen] = useState(false);

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
        <ModalPage
          colorType={ColorType.NEUTRAL}
          open={open}
          setOpen={setOpen}
          component={
            <CreateExamPhase setOpen={setOpen} setWhichTimer={setWhichTimer} />
          }
        />
      </div>
    </>
  );
}
