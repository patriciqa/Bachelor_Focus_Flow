import CreateExamPhase from "@/component/settings/CreateExamPhase";
import { useState } from "react";
import ModalPage from "../settings/causes/ModalPage";

export default function CreatePhaseView() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-center">
        <p>Start a new exam phase to track your data.</p>
        <button>hi</button>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Create exam phase
        </button>
        <ModalPage
          open={open}
          setOpen={setOpen}
          component={<CreateExamPhase setOpen={setOpen} />}
        />
      </div>
    </>
  );
}
