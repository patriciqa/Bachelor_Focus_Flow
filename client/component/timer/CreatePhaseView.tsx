import CreateExamPhase from "@/component/settings/CreateExamPhase";
import { WhichTimer } from "@/types/Timer";
import { useState } from "react";
import CustomButton from "../CustomButton";
import ModalPage from "../settings/reasons/ModalPage";

export default function CreatePhaseView({
  setWhichTimer,
}: {
  setWhichTimer?: (d: WhichTimer) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-[100vh] bg-white/30 top-0  z-10 pb-20 left-0 fixed w-[100vw] items-center flex-col flex justify-center text-center p-5  backdrop-blur ">
        Create a new exam phase.
        <div className="w-3/4 py-2 mt-4 mb-6 text-center text-h16 text-pieGrey">
          This step is needed to manage your tracked data.
        </div>
        <CustomButton
          variant="dark"
          onClick={() => {
            setOpen(true);
          }}
        >
          create exam phase
        </CustomButton>
        <ModalPage
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
