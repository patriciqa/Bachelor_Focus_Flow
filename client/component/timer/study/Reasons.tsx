import CustomButton from "@/component/CustomButton";
import TextWithIcon from "@/component/icon/TextWithIcon";
import ModalPage from "@/component/settings/reasons/ModalPage";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { getElement } from "@/db/Actions";
import saveToDb from "@/hooks/SaveToDb";
import { StudyComponent } from "@/types/Components";
import { Reason, Study, WhichTimer } from "@/types/Timer";
import { includes } from "lodash";
import { useEffect, useState } from "react";
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
  const [selected, setSelected] = useState<number[] | undefined>();

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
                  let selectedReasons = [];
                  if (reason.id !== undefined) {
                    if (selected === undefined) {
                      selectedReasons = [reason.id];
                    } else if (includes(selected, reason.id)) {
                      selectedReasons = selected.filter((e) => e !== reason.id);
                    } else {
                      selectedReasons = [...selected];
                      if (reason.id !== undefined) {
                        selectedReasons.push(reason.id);
                      }
                    }
                    setSelected(selectedReasons);
                  }
                }}
              >
                <TextWithIcon icon={reason.icon} text={reason.title} />
              </button>
            </>
          ))}
      </div>
      <CustomButton
        onClick={() => {
          setOpen(true);
        }}
      >
        create new reason
      </CustomButton>
      <CustomButton
        size="regular"
        variant="break"
        onClick={() => {
          saveToDb(examPhaseId, studyEntry, true);
          setShowComponent(StudyComponent.NO_COMPONENT);
          setWhichTimer(WhichTimer.BREAK);
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
