import { addElement } from "@/db/Actions";
import { ExamPhase, PageComponent } from "@/types/Timer";
import { useState } from "react";
import Calendar from "react-calendar";
export type PickedDate = {
  from: number;
  to: number;
};
export default function ExampPhaseInput({
  setShowComponent,
}: {
  setShowComponent: (d: PageComponent) => void;
}) {
  let [range, setRange] = useState({
    start: Date.now(),
    end: Date.now(),
  });
  const [showCalender, setShowCalender] = useState(false);
  const [date, setDate] = useState<PickedDate>();

  const getDate = (): string => {
    let d = "";
    if (date) {
      let fromDay = new Date(date.from).getDate();
      let fromMonth = new Date(date.from).getMonth() + 1;
      let toDay = new Date(date.to).getDate();
      let toMonth = new Date(date.to).getMonth() + 1;
      let toYear = new Date(date.to).getFullYear();
      d = `${fromDay}.${fromMonth} - ${toDay}.${toMonth}.${toYear}`;
    }

    return d;
  };

  const [examPhase, setExamPhase] = useState<ExamPhase>();
  return (
    <div className="flex flex-col">
      <div>Create new Exam Phase</div>
      {/* <input type="text"></input> */}
      <input
        type="text"
        id="name"
        name="name"
        required
        className="bg-tahiti"
        onChange={(i) => {
          console.log(i.target.value);
          const e = { ...examPhase };
          e.title = i.target.value;
          setExamPhase(e);
        }}
      />
      <button
        onClick={() => {
          if (showCalender) {
            setShowCalender(false);
          } else {
            setShowCalender(true);
          }
        }}
      >
        select Date
      </button>
      <div>{getDate()}</div>
      {showCalender && (
        <Calendar
          onChange={(d: any) => {
            console.log(d[1]);
            // let sortedDate = date.sort((a, b) => a.getTime() - b.getTime());
            if (d[1]) {
              setDate({
                from: d[0].getTime(),
                to: d[1].getTime(),
              });
              setShowCalender(false);
              const e = { ...examPhase };
              e.startDate = d[0].getTime();
              e.endDate = d[1].getTime();
              setExamPhase(e);
              console.log(examPhase);
            } else {
              const s = d[0];
              const newD = new Date(s.getTime() + 60 * 60 * 24 * 1000);
              setDate({
                from: newD.getTime(),
                to: d[0].getTime(),
              });
            }
            console.log(date);
          }}
          value={[new Date(Date.now()), new Date(new Date(Date.now() + 1))]}
          selectRange={true}
          allowPartialRange={true}
          formatShortWeekday={(_locale, value) =>
            ["S", "M", "D", "M", "D", "F", "S"][value.getDay()]
          }
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
        />
      )}
      <button
        onClick={() => {
          if (examPhase !== undefined) {
            addElement("examPhases", examPhase);
          }
          setShowComponent(PageComponent.STUDYTIMER);
        }}
      >
        save
      </button>
    </div>
  );
}
