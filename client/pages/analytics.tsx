import PieChartBoosters from "@/component/charts/PieChartBoosters";
import PieChartDowners from "@/component/charts/PieChartDowners";
import CreatePhaseView from "@/component/timer/CreatePhaseView";
import { getElement } from "@/db/Actions";
import { ExamPhase } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sortBy } from "lodash";
import moment from "moment";
import "moment/locale/de-ch";
import { useEffect, useState } from "react";

export default function Analytcs() {
  const [phases, setPhases] = useState<ExamPhase[]>();
  const [activePhase, setActivePhase] = useState<ExamPhase>();
  const [selectedDate] = useState(new Date());
  const [hidePrevArrow, setHidePrevArrow] = useState(false);
  const [hideNextArrow, setHideNextArrow] = useState(false);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  const getData = async (): Promise<ExamPhase[]> => {
    const p: ExamPhase[] = [];
    const data: ExamPhase[] = await getElement("examPhases", "all");
    data.map((phase) => {
      const choosenDate = selectedDate.setHours(0, 0, 0, 0); //choosen date
      p.push(phase);
      if (phase.startDate && phase.endDate) {
        if (phase.startDate <= choosenDate && choosenDate < phase.endDate) {
          setActivePhase(phase);
        }
      }
    });
    if (activePhase === undefined) {
      setActivePhase(p[p.length - 1]);
    }
    setPhases(p);
    return data;
  };

  useEffect(() => {
    getData();
    setInitialRenderComplete(true);
  }, []);

  const getPreviewPhase = (prev: boolean) => {
    if (activePhase !== undefined && activePhase.id !== undefined) {
      let newId = 0;
      const sorted = sortBy(phases, (p) => p.startDate);

      if (prev) {
        newId = activePhase.id - 1;
        sorted?.map((p, index) => {
          if (p.id === activePhase.id) {
            const i = (index -= 1);
            if (sorted[i] !== undefined) {
              setActivePhase(sorted[i]);
            }
          }
        });
      } else {
        newId = activePhase.id + 1;
        sorted?.map((p, index) => {
          if (p.id === activePhase.id) {
            console.log(index);
            const i = (index += 1);
            if (sorted[i] !== undefined) {
              setActivePhase(sorted[i]);
              setHideNextArrow(false);
              setHidePrevArrow(false);
            }
          }
        });
      }
    }
  };

  return (
    <>
      {phases?.length === 0 ? (
        <CreatePhaseView />
      ) : (
        <div className="flex flex-col  w-[100vw] p-5 bg-background  pb-[20vh]">
          {activePhase !== undefined && (
            <>
              <div className="flex w-full pt-12">
                {!hidePrevArrow && (
                  <div
                    className="flex-1 pt-1 text-center "
                    onClick={() => getPreviewPhase(true)}
                  >
                    {initialRenderComplete && (
                      <FontAwesomeIcon
                        icon={["fas", "chevron-left"]}
                        size="xl"
                      />
                    )}
                  </div>
                )}
                <div className="flex flex-col items-center justify-center">
                  <div className="pb-1 font-semibold text-h24 ">
                    {activePhase?.title}
                  </div>
                  <div className="text-pieGrey text-h16 ">
                    {moment(activePhase.startDate).format("L")} -{" "}
                    {moment(activePhase.endDate).format("L")}
                  </div>
                </div>
                {!hideNextArrow && (
                  <div
                    className="flex-1 text-center "
                    onClick={() => getPreviewPhase(false)}
                  >
                    {initialRenderComplete && (
                      <FontAwesomeIcon
                        icon={["fas", "chevron-right"]}
                        size="xl"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="pt-6 pb-1 text-h20 ">
                your most selected mood boosters
                <FontAwesomeIcon
                  className="ml-2"
                  icon={["fas", "arrow-trend-up"]}
                />
              </div>
              <div className="bg-white shadow-[1px_4px_16px_rgba(39,37,37,0.15)] rounded">
                <PieChartBoosters activePhase={activePhase} />
              </div>
              <div className="pt-6 pb-1 text-h20">
                your most selected mood downers
                <FontAwesomeIcon
                  className="ml-2"
                  icon={["fas", "arrow-trend-down"]}
                />
              </div>
              <div className="bg-white shadow-[1px_4px_16px_rgba(39,37,37,0.15)] rounded ">
                <PieChartDowners activePhase={activePhase} />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
