import PieChartBreak from "@/component/charts/PieChartBreak";
import PieChartStudy from "@/component/charts/PieChartStudy";
import { getElement } from "@/db/Actions";
import { ExamPhase } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sortBy } from "lodash";
import moment from "moment";
import "moment/locale/de-ch";
import { useEffect, useState } from "react";

const grin = "./image/mood.grin.svg";
const smile = "./image/mood.smile.svg";
const question = "./image/skip.svg";
const meh = "./image/mood.meh.svg";
const frown = "./image/mood.frown.svg";

export default function Analytcs() {
  const [phases, setPhases] = useState<ExamPhase[]>();
  const [activePhase, setActivePhase] = useState<ExamPhase>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hidePrevArrow, setHidePrevArrow] = useState(false);
  const [hideNextArrow, setHideNextArrow] = useState(false);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  const getData = async (): Promise<ExamPhase[]> => {
    const p: ExamPhase[] = [];
    const data: ExamPhase[] = await getElement("examPhases", "all");
    data.map((phase) => {
      console.log("phase", phase);
      const choosenDate = selectedDate.setHours(0, 0, 0, 0); //choosen date
      p.push(phase);
      if (phase.startDate && phase.endDate)
        if (phase.startDate <= choosenDate && choosenDate < phase.endDate) {
          setActivePhase(phase);
        }
    });
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
    <div className="flex flex-col items-center w-[100vw] p-5 bg-background">
      {activePhase !== undefined && (
        <>
          <div className="flex w-full">
            {!hidePrevArrow && (
              <div
                className="flex-1 text-center "
                onClick={() => getPreviewPhase(true)}
              >
                {initialRenderComplete && (
                  <FontAwesomeIcon icon={["fas", "chevron-left"]} />
                )}
              </div>
            )}
            <div>
              <div className="font-bold text-h24">
                exam phase {activePhase?.title}
              </div>
              <div>
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
                  <FontAwesomeIcon icon={["fas", "chevron-right"]} />
                )}
              </div>
            )}
          </div>
          <div>mood influences while taking breaks</div>
          <div className="bg-white ">
            <PieChartStudy activePhase={activePhase} />
          </div>
          <div>mood influences while taking breaks</div>
          <div className="bg-white ">
            <PieChartBreak activePhase={activePhase} />
          </div>
        </>
      )}
    </div>
  );
}
