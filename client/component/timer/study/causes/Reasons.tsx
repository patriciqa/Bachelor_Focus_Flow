import { Pop } from "@/component/transitions/Pop";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { getElement } from "@/db/Actions";
import saveToDb from "@/hooks/SaveToDb";
import { StudyComponent } from "@/types/Components";
import { Reason, WhichTimer, Study } from "@/types/Timer";
import { AnimatePresence } from "framer-motion";
import { filter, includes } from "lodash";
import React, { useEffect, useState } from "react";
import CreateReason from "./CreateReason";

export default function Reasons({
  good,
  setWhichTimer,
  setShowComponent,
  studyEntry,
  setStudyEntry,
}: {
  good: boolean;
  setWhichTimer: (d: WhichTimer) => void;
  setShowComponent: (p: StudyComponent) => void;
  studyEntry: Study;
  setStudyEntry: (s: Study) => void;
}) {
  const { examPhaseId } = useExamPhaseContext();
  let [open, setOpen] = useState(false);
  const [reasons, setReasons] = useState<Reason[]>();
  const selectedReason: Reason[] = [];
  const [selected, setSelected] = useState<string[]>();

  async function getData(): Promise<Reason[]> {
    const data: Reason[] = await getElement("reasons", "all");
    return data;
  }

  useEffect(() => {
    getData().then((c) => {
      c.map((a) => {
        if (good) {
          if (a.goodReason) {
            selectedReason.push(a);
            setReasons(selectedReason);
          }
        } else {
          if (!a.goodReason) {
            selectedReason.push(a);
            setReasons(selectedReason);
          }
        }
      });
    });
  });

  useEffect(() => {
    const s = { ...studyEntry };
    s.reasonIds = selected;
    setStudyEntry(s);
  }, [selected]);

  return (
    <>
      {good ? (
        <div>Great! Why did it go well?</div>
      ) : (
        <div>Why did it go not so well?</div>
      )}
      <div>
        {reasons !== undefined &&
          reasons.map((reason) => (
            <>
              <button
                className={
                  "w-full  p-2 align-center  justify-center flex " +
                  (includes(selected, reason.id) === true && "bg-metal")
                }
                onClick={() => {
                  let selectedReasons;
                  if (selected === undefined) {
                    selectedReasons = [reason.id];
                  } else if (includes(selected, reason.id)) {
                    selectedReasons = selected.filter((e) => e !== reason.id);
                  } else {
                    selectedReasons = [...selected];
                    selectedReasons.push(reason.id);
                  }
                  setSelected(selectedReasons);
                }}
              >
                {reason.icon}
                {reason.title}
              </button>
            </>
          ))}
      </div>

      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        create new reason
      </button>

      <button
        onClick={() => {
          saveToDb(examPhaseId, studyEntry, true);
          setShowComponent(StudyComponent.NO_COMPONENT);
          setWhichTimer(WhichTimer.BREAK);
        }}
      >
        complete
      </button>
      <AnimatePresence>
        {open && (
          <Pop onClose={() => setOpen(false)}>
            <button className="" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <CreateReason setOpen={setOpen} goodReason={good ? true : false} />
          </Pop>
        )}
      </AnimatePresence>
    </>
  );
}
