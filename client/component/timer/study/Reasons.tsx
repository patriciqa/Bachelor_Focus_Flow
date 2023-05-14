import CustomButton from "@/component/CustomButton";
import ButtonList, { ButtonVariant } from "@/component/icon/ButtonList";
import ModalPage from "@/component/settings/reasons/ModalPage";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { getElement } from "@/db/Actions";
import saveToDb from "@/hooks/SaveToDb";
import sToM from "@/hooks/SecondsToMinutes";
import { StudyComponent } from "@/types/Components";
import { Reason, Study, WhichTimer } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { includes } from "lodash";
import { SetStateAction, useEffect, useState } from "react";
import CreateView from "../CreateView";

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
  const [open, setOpen] = useState(false);
  const [reasons, setReasons] = useState<Reason[]>();
  const selectedReason: Reason[] = [];
  const [selected, setSelected] = useState<number[] | null>([]);

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
    <div className="flex flex-col items-center justify-center">
      {good ? (
        <>
          <div>study {sToM(studyEntry.timer.duration)}min</div>
          <div>Great! Why did it go well?</div>
        </>
      ) : (
        <>
          <div>study {sToM(studyEntry.timer.duration)}min</div>
          <div>Why did it go bad?</div>
        </>
      )}
      <div className="flex flex-col justify-center">
        <div className="h-[50vh] relative py-4 w-[70vw]">
          <div className="max-h-full overflow-auto">
            {reasons !== undefined &&
              reasons.map((reason) => (
                <>
                  <ButtonList
                    reason={reason}
                    selected={selected}
                    whenClicked={() => {
                      let selectedReasons: SetStateAction<number[] | null> = [];
                      if (reason.id !== undefined) {
                        if (selected === undefined) {
                          selectedReasons = [reason.id];
                        } else if (
                          includes(selected, reason.id) &&
                          selected !== null
                        ) {
                          selectedReasons = selected.filter(
                            (e) => e !== reason.id
                          );
                        } else {
                          if (selected !== null) {
                            selectedReasons = [...selected];
                            if (reason.id !== undefined) {
                              selectedReasons.push(reason.id);
                            }
                          }
                        }
                        setSelected(selectedReasons);
                      }
                    }}
                    icon={reason.icon !== "" ? reason.icon : undefined}
                    text={reason.title}
                    buttonVariant={ButtonVariant.STUDY}
                  />
                </>
              ))}
            <button
              onClick={() => {
                setSelected(null);
                console.log(selected);
              }}
              className={
                "flex flex-row items-center justify-center flex-grow w-full p-3 my-2 border rounded-[32px] border-inactiveGrey " +
                (selected === null && "bg-inactiveGrey text-white")
              }
            >
              i don't know
            </button>
            <button
              className="flex items-center justify-center w-full my-6 text-study"
              onClick={() => {
                setOpen(true);
              }}
            >
              <FontAwesomeIcon
                className="pr-2 text-study"
                icon={["fas", "plus"]}
              />
              add new course
            </button>
          </div>
        </div>
      </div>
      <CustomButton
        size="regular"
        variant={
          selected !== null && selected.length >= 1 ? "study" : "disabled"
        }
        onClick={() => {
          saveToDb(examPhaseId, studyEntry, true);
          setShowComponent(StudyComponent.NO_COMPONENT);
          setWhichTimer(WhichTimer.BREAK);
          setStudyEntry({ timer: { startTime: 0, duration: 0 } });
        }}
      >
        complete
      </CustomButton>

      <ModalPage
        open={open}
        setOpen={setOpen}
        component={
          <CreateView setOpen={setOpen} goodReason={good ? true : false} />
        }
      />
    </div>
  );
}
