import PieChartBreak from "@/component/charts/PieChartBreak";
import PieChartStudy from "@/component/charts/PieChartStudy";
import { getElement } from "@/db/Actions";
import { ExamPhase } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import "moment/locale/de-ch";
import { useEffect, useState } from "react";

export default function Analytcs() {
  const [phases, setPhases] = useState<ExamPhase[]>();
  const [activePhase, setActivePhase] = useState<ExamPhase>();
  const [selectedDate, setSelectedDate] = useState(new Date());
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
      if (prev) {
        newId = activePhase.id - 1;
      } else {
        newId = activePhase.id + 1;
      }
      console.log(newId);
      phases?.map((p) => {
        if (p.id === newId) {
          setActivePhase(p);
        }
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-[100vw] p-5 bg-background">
      {activePhase !== undefined && (
        <>
          <div className="flex">
            <div
              className="flex-1 text-center "
              onClick={() => getPreviewPhase(true)}
            >
              {initialRenderComplete && (
                <FontAwesomeIcon icon={["fas", "chevron-left"]} />
              )}
            </div>
            <div>
              <div className="font-bold text-h24">
                exam phase {activePhase?.title}
              </div>
              <div>
                {moment(activePhase.startDate).format("L")} -{" "}
                {moment(activePhase.endDate).format("L")}
              </div>
            </div>
            <div
              className="flex-1 text-center "
              onClick={() => getPreviewPhase(false)}
            >
              {initialRenderComplete && (
                <FontAwesomeIcon icon={["fas", "chevron-right"]} />
              )}
            </div>
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
