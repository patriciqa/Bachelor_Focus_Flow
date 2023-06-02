import { getElement } from "@/db/Actions";
import { SettingComponent } from "@/types/Components";
import { ExamPhase, WhichTimer } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import "moment/locale/de-ch";
import { useEffect, useState } from "react";
import { ColorType } from "../CancellButton";
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
    console.log(id);

    if (id !== "") {
      if (id !== null)
        getElement("examPhases", parseInt(id)).then((result: any) => {
          setExamPhaseTitle(result);
        });
    }
  }, [open, editOpen]);

  return (
    <div className="flex flex-col h-full p-4 overflow-scroll">
      <div className={"flex justify-center w-full pt-6 px-14 pb-12	"}>
        <button
          onClick={() => setActive(true)}
          className={
            "w-1/2 rounded-l-lg text-white p-2  " +
            (active ? "bg-[#333333] rounded  " : "bg-inactiveGrey ")
          }
        >
          active
        </button>
        <button
          onClick={() => setActive(false)}
          className={
            "w-1/2 rounded-r-lg text-white p-2 " +
            (!active ? "bg-[#333333] rounded  " : " bg-inactiveGrey")
          }
        >
          other
        </button>
      </div>
      {active ? (
        <button
          onClick={() => {
            if (examPhaseTitle !== null) {
              setActivePhase(examPhaseTitle);
              setEditOpen(true);
            }
          }}
          className="flex justify-between w-[90vw] py-2"
        >
          {initialRenderComplete && (
            <>
              <div className="flex flex-col items-start font-bold text-h24">
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
                      className="flex justify-between w-[90vw] py-2"
                    >
                      {initialRenderComplete && (
                        <>
                          <div className="flex flex-col items-start font-bold text-h24">
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
        colorType={ColorType.NEUTRAL}
        isStudy={false}
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
      />{" "}
      {activePhase !== undefined && (
        <ModalPage
          colorType={ColorType.NEUTRAL}
          isStudy={false}
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
