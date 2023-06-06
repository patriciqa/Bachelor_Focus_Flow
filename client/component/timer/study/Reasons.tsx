import CustomButton from "@/component/CustomButton";
import ButtonList, { ButtonVariant } from "@/component/icon/ButtonList";
import ModalPage from "@/component/settings/reasons/ModalPage";
import { getElement } from "@/db/Actions";
import sToM from "@/hooks/SecondsToMinutes";
import { StudyComponent } from "@/types/Components";
import { Mood, Reason, Study } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { includes } from "lodash";
import { SetStateAction, useEffect, useState } from "react";
import CreateView from "../CreateView";

export default function Reasons({
  good,
  setShowComponent,
  studyEntry,
  setStudyEntry,
}: {
  good: boolean;
  setShowComponent: (p: StudyComponent) => void;
  studyEntry: Study;
  setStudyEntry: (s: Study) => void;
}) {
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

  const getText = (): string => {
    let text = "";
    switch (studyEntry.mood) {
      case Mood.GOOD:
        text = "Why did it go good?";
        break;
      case Mood.RATHER_GOOD:
        text = "Why did it go rather good?";
        break;
      case Mood.RATHER_BAD:
        text = "Why did it go rather bad?";
        break;
      case Mood.BAD:
        text = "Why did it go bad?";
        break;
    }
    return text;
  };

  return (
    <div className="relative flex flex-col items-center h-full">
      <div className="mb-6 font-light text-h16 text-pieGrey">
        <FontAwesomeIcon icon={["fas", "clock"]} className="text-pieGrey" />{" "}
        study {sToM(studyEntry.timer.duration)}
      </div>
      <div>{getText()}</div>
      <div className="pt-2 text-h16 text-chartGrey">select up to 3 causes</div>
      <div className="flex flex-col justify-center">
        <div className="h-[52vh] relative py-4 w-[70vw]">
          <div className="max-h-full overflow-auto">
            {reasons !== undefined &&
              reasons.map((reason) => (
                <>
                  {!reason.archived && (
                    <ButtonList
                      reason={reason}
                      selected={selected}
                      whenClicked={() => {
                        let selectedReasons: SetStateAction<number[] | null> =
                          [];
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
                            if (selected !== null && selected.length < 3) {
                              selectedReasons = [...selected];
                              if (reason.id !== undefined) {
                                selectedReasons.push(reason.id);
                              }
                            } else {
                              if (selected !== null) {
                                selectedReasons = [...selected];
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
                  )}
                </>
              ))}
            <button
              onClick={() => {
                setSelected(null);
              }}
              className={
                "flex flex-row items-center justify-center flex-grow w-full p-3 my-2 border rounded-[32px] border-inactiveGrey " +
                (selected === null && "bg-study text-white")
              }
            >
              i don't know
            </button>
            <button
              className="flex items-center justify-center w-full pb-12 my-6 text-study"
              onClick={() => {
                setOpen(true);
              }}
            >
              <FontAwesomeIcon
                className="pr-2 text-study"
                icon={["fas", "plus"]}
              />
              add new cause
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[8vh]">
        <CustomButton
          variant={
            selected === null || selected.length >= 1 ? "study" : "disabled"
          }
          onClick={() => {
            setShowComponent(StudyComponent.STUDY_SUMMARY);
          }}
        >
          continue
        </CustomButton>
      </div>
      <ModalPage
        open={open}
        setOpen={setOpen}
        component={
          <CreateView
            setOpen={setOpen}
            isBreak={false}
            goodReason={good ? true : false}
          />
        }
      />
    </div>
  );
}
