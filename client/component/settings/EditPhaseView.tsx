import { editElement } from "@/db/Actions";
import { ExamPhase, PickedDate } from "@/types/Timer";
import { useRouter } from "next/router";
import { useState } from "react";
import CustomButton from "../CustomButton";

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

  const [examPhase, setExamPhase] = useState<ExamPhase>();

  const input = document.getElementById("myInput") as HTMLInputElement;
  const countSpan = document.getElementById("count");
  if (input !== null && countSpan !== null) {
    input.addEventListener("input", function () {
      console;
      countSpan.textContent = input.value.length.toString();
    });
  }
  return (
    <div className="relative flex flex-col items-center h-full">
      <div className=" text-h24 pt-[10vh] mb-12"> edit exam phase</div>
      <p
        className="flex justify-end w-4/5 text-chartGrey text-h16"
        id="characterCount"
      >
        <span id="count">{activePhase.title?.length}</span>/20
      </p>
      <input
        maxLength={20}
        autoComplete="off"
        type="text"
        id="myInput"
        name="name"
        required
        value={phase.title}
        className="w-4/5 h-10 pl-2 border border-black rounded border-chartGrey "
        onChange={(i) => {
          console.log(i.target.value);
          const e = { ...phase };
          e.title = i.target.value;
          setPhase(e);
        }}
        placeholder="title..."
      />
      <input
        id="name"
        name="name"
        required
        disabled
        value={getDate()}
        className="w-4/5 h-10 pl-2 mt-5 border border-black rounded border-chartGrey bg-inactiveGrey "
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

      <div className="absolute flex items-end justify-center bottom-10 ">
        <CustomButton
          variant="dark"
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
          save
        </CustomButton>
      </div>
    </div>
  );
}
