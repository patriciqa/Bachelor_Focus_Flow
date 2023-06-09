import { getElement } from "@/db/Actions";
import { SettingComponent } from "@/types/Components";
import { ExamPhase, WhichTimer } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import "moment/locale/de-ch";
import { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import CreateExamPhase from "./CreateExamPhase";
import EditPhaseView from "./EditPhaseView";
import ModalPage from "./reasons/ModalPage";

export default function ExamPhaseOverview({
  setShowComponent,
  setWhichTimer,
}: {
  setShowComponent: (c: SettingComponent) => void;
  setWhichTimer: (d: WhichTimer) => void;
}) {
  const [active, setActive] = useState(true);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [phases, setPhases] = useState<ExamPhase[]>();
  const [examPhaseTitle, setExamPhaseTitle] = useState<ExamPhase | null>();
  const [activePhase, setActivePhase] = useState<ExamPhase>();
  const examphases: ExamPhase[] = [];

  const getPhases = async (): Promise<ExamPhase[]> => {
    const a = (await getElement("examPhases", "all").then((result) => {
      return result;
    })) as ExamPhase[];
    return a;
  };

  useEffect(() => {
    getPhases().then((phase: ExamPhase[]) => {
      phase.forEach((p: any) => {
        examphases.push(p);
        setPhases(phase);
        const today = Math.floor(Date.now());

        if (p.id !== undefined && today > p.startDate && p.endDate > today) {
          localStorage.setItem("examId", p.id.toString());
        }
      });
    });
    const id = localStorage.getItem("examId");
    if (id !== "") {
      if (id !== null)
        getElement("examPhases", parseInt(id)).then((result: any) => {
          setExamPhaseTitle(result);
        });
    }
  }, [open, editOpen]);

  return (
    <div className="flex flex-col items-center w-full h-[100vh] px-6">
      <div className="relative h-[58px] w-[70%] flex justify-center items-center mb-2 bg-chartGrey rounded-2xl">
        <button
          onClick={() => setActive(true)}
          className={
            "w-[52%] rounded-2xl left-0  absolute text-white  h-[60px] font-medium  " +
            (active && "bg-dark rounded  z-10 ")
          }
        >
          active
        </button>
        <button
          onClick={() => setActive(false)}
          className={
            "w-[52%] rounded-2xl right-0  absolute text-white  h-[60px] font-medium  " +
            (!active && "bg-dark rounded  z-10 ")
          }
        >
          inactive
        </button>
      </div>
      <div className="h-[65%] relative w-full py-4 overflow-auto mb-4 ">
        {active ? (
          <button
            onClick={() => {
              if (examPhaseTitle !== null) {
                setActivePhase(examPhaseTitle);
                setEditOpen(true);
              }
            }}
            className="flex justify-between w-[85vw] py-2"
          >
            {initialRenderComplete && (
              <>
                <div className="flex flex-col items-start font-medium text-h24">
                  {examPhaseTitle?.title !== undefined
                    ? examPhaseTitle?.title
                    : "no active exam phase"}

                  <br />
                  {examPhaseTitle !== undefined && (
                    <div className="mt-1 font-normal text-h14 text-chartGrey">
                      {moment(examPhaseTitle?.startDate).format("L")} -{" "}
                      {moment(examPhaseTitle?.endDate).format("L")}
                    </div>
                  )}
                </div>
                {examPhaseTitle !== undefined && (
                  <FontAwesomeIcon
                    icon={["fas", "ellipsis-vertical"]}
                    size="xl"
                  />
                )}
              </>
            )}
          </button>
        ) : (
          <div>
            <div>
              {phases !== undefined &&
                phases.map((p) => (
                  <div>
                    {p?.title !== examPhaseTitle?.title && (
                      <button
                        onClick={() => {
                          if (p !== null) {
                            setActivePhase(p);
                            setEditOpen(true);
                          }
                        }}
                        className="flex justify-between w-[85vw] py-2"
                      >
                        {initialRenderComplete && (
                          <>
                            <div className="flex flex-col items-start font-medium text-h24">
                              {p?.title}
                              <br />
                              <div className="mt-1 font-normal text-h14 text-chartGrey">
                                {moment(p?.startDate).format("L")} -{" "}
                                {moment(p?.endDate).format("L")}
                              </div>
                            </div>
                            <FontAwesomeIcon
                              icon={["fas", "ellipsis-vertical"]}
                              size="xl"
                            />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <div className="absolute flex items-end justify-center bottom-10 ">
        {active && (
          <CustomButton
            variant="dark"
            onClick={() => {
              setOpen(true);
            }}
          >
            create exam phase
          </CustomButton>
        )}
      </div>
      <ModalPage
        open={open}
        setOpen={setOpen}
        component={
          <CreateExamPhase
            setOpen={setOpen}
            phases={phases}
            setShowComponent={setShowComponent}
            setWhichTimer={setWhichTimer}
          />
        }
      />
      {activePhase !== undefined && (
        <ModalPage
          open={editOpen}
          setOpen={setEditOpen}
          component={
            <EditPhaseView setOpen={setEditOpen} activePhase={activePhase} />
          }
        />
      )}
    </div>
  );
}
