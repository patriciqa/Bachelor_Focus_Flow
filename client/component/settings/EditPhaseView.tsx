import { editElement } from "@/db/Actions";
import { ExamPhase, PickedDate } from "@/types/Timer";
import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";

export default function EditPhaseView({
  setOpen,
  activePhase,
}: {
  setOpen?: (c: boolean) => void;
  activePhase: ExamPhase;
}) {
  const [date, setDate] = useState<PickedDate>();
  const [phase, setPhase] = useState<ExamPhase>(activePhase);
  const router = useRouter().route;

  const getDate = (): string => {
    let d = "";
    if (phase.startDate && phase.endDate) {
      const fromDay = new Date(phase.startDate).getDate();
      const fromMonth = new Date(phase.startDate).getMonth() + 1;
      const toDay = new Date(phase.endDate).getDate();
      const toMonth = new Date(phase.endDate).getMonth() + 1;
      const toYear = new Date(phase.endDate).getFullYear();
      d = `${fromDay}.${fromMonth} - ${toDay}.${toMonth}.${toYear}`;
    }

    return d;
  };
  const dates: SetStateAction<Date[]> = [];

  const [examPhase, setExamPhase] = useState<ExamPhase>();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="font-bold text-h24"> edit exam phase</div>
      <input
        type="text"
        id="name"
        name="name"
        required
        value={phase.title}
        className="pl-2 border border-black w-[70vw] rounded h-9 mt-10"
        onChange={(i) => {
          console.log(i.target.value);
          const e = { ...phase };
          e.title = i.target.value;
          setPhase(e);
        }}
        placeholder="Title..."
      />
      <input
        type="text"
        id="name"
        name="name"
        required
        disabled
        value={getDate()}
        className="pl-2 border border-black w-[70vw] rounded h-9 mt-10  text-pieGrey"
        onChange={(i) => {
          console.log(i.target.value);
          const e = { ...examPhase };
          e.title = i.target.value;
          setExamPhase(e);
        }}
        placeholder={`${
          getDate !== undefined ? getDate() : "dd.mm.yyyy - dd.mm.yyyy"
        }`}
      />

      <button
        onClick={() => {
          if (phase.id !== undefined) {
            console.log(examPhase);
            editElement("examPhases", phase.id, phase);
            // addElement("examPhases", examPhase);
            if (setOpen !== undefined) {
              setOpen(false);
            }
          }
        }}
      >
        Save
      </button>
    </div>
  );
}
