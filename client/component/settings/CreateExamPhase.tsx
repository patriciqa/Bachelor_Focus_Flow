import { addElement } from "@/db/Actions";
import { SettingComponent } from "@/types/Components";
import { ExamPhase, PickedDate, WhichTimer } from "@/types/Timer";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import Calendar from "react-calendar";

export default function CreateExamPhase({
  setShowComponent,
  phases,
  setOpen,
  setWhichTimer,
}: {
  setShowComponent?: (c: SettingComponent) => void;
  phases?: ExamPhase[];
  setOpen?: (c: boolean) => void;
  setWhichTimer: (d: WhichTimer) => void;
}) {
  const [showCalender, setShowCalender] = useState(false);
  const [date, setDate] = useState<PickedDate>();
  const [disabledDates, setDisabledDates] = useState([new Date(1683842400000)]);
  const router = useRouter().route;
  const getDate = (): string => {
    let d = "";
    if (date) {
      const fromDay = new Date(date.from).getDate();
      const fromMonth = new Date(date.from).getMonth() + 1;
      const toDay = new Date(date.to).getDate();
      const toMonth = new Date(date.to).getMonth() + 1;
      const toYear = new Date(date.to).getFullYear();
      d = `${fromDay}.${fromMonth} - ${toDay}.${toMonth}.${toYear}`;
    }

    return d;
  };
  const dates: SetStateAction<Date[]> = [];

  useEffect(() => {
    phases?.map((phase) => {
      if (phase.startDate !== undefined && phase.endDate) {
        console.log(phase.startDate);
        console.log(phase.endDate);
        let currentDate = new Date(phase.startDate);

        while (currentDate <= new Date(phase.endDate)) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        dates;
        console.log(new Date(phase.startDate));
      }
      setDisabledDates(dates);
    });
  }, []);

  const [examPhase, setExamPhase] = useState<ExamPhase>();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="font-bold text-h24"> create exam phase</div>
      <input
        autoComplete="off"
        type="text"
        id="name"
        name="name"
        required
        className=" border  pl-2 border-black w-[70vw] rounded h-9 mt-10"
        onChange={(i) => {
          console.log(i.target.value);
          const e = { ...examPhase };
          e.title = i.target.value;
          setExamPhase(e);
        }}
        placeholder="Title..."
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
        <input
          type="text"
          id="name"
          name="name"
          required
          onClick={() => {
            if (showCalender) {
              setShowCalender(false);
            } else {
              setShowCalender(true);
            }
          }}
          className="pl-2 border border-black w-[70vw] rounded h-9 mt-10"
          onChange={(i) => {
            console.log(i.target.value);
            const e = { ...examPhase };
            e.title = i.target.value;
            setExamPhase(e);
          }}
          placeholder={`${
            getDate !== undefined ? getDate() : "dd.mm.yyyy - dd.mm.yyyy"
          }`}
        />
      </button>
      {showCalender && (
        <Calendar
          onChange={(d: any) => {
            if (d[1]) {
              setDate({
                from: d[0].getTime(),
                to: d[1].getTime(),
              });
              setShowCalender(false);
              const e = { ...examPhase };
              e.startDate = d[0].getTime();
              e.endDate = d[1].getTime();
              console.log(examPhase);
              setExamPhase(e);
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
          tileDisabled={({ date, view }) =>
            view === "month" && // Block day tiles only
            disabledDates.some(
              (disabledDate) =>
                date.getFullYear() === disabledDate.getFullYear() &&
                date.getMonth() === disabledDate.getMonth() &&
                date.getDate() === disabledDate.getDate()
            )
          }
        />
      )}
      <button
        onClick={() => {
          if (examPhase !== undefined) {
            console.log(examPhase);
            addElement("examPhases", examPhase);
            if (setOpen !== undefined) {
              setOpen(false);
            }
          }
          if (router === "/settings" && setShowComponent !== undefined) {
            setShowComponent(SettingComponent.EXAMPHASE_OVERVIEW);
            if (setOpen !== undefined) {
              setOpen(false);
            }
          } else {
            if (setOpen !== undefined) {
              setOpen(false);
              setWhichTimer(WhichTimer.STUDY);
            }
          }
        }}
      >
        Save
      </button>
    </div>
  );
}
