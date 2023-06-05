import { addElement } from "@/db/Actions";
import { SettingComponent } from "@/types/Components";
import { ExamPhase, PickedDate, WhichTimer } from "@/types/Timer";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import Calendar from "react-calendar";
import CustomButton, { buttonVariant } from "../CustomButton";

export default function CreateExamPhase({
  setShowComponent,
  phases,
  setOpen,
  setWhichTimer,
}: {
  setShowComponent?: (c: SettingComponent) => void;
  phases?: ExamPhase[];
  setOpen?: (c: boolean) => void;
  setWhichTimer?: (d: WhichTimer) => void;
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
      const fromYear = new Date(date.from).getFullYear();
      const toDay = new Date(date.to).getDate();
      const toMonth = new Date(date.to).getMonth() + 1;
      const toYear = new Date(date.to).getFullYear();
      d = `${fromDay < 10 ? `0${fromDay}` : fromDay}.${
        fromMonth < 10 ? `0${fromMonth}` : fromMonth
      }.${fromYear} - ${toDay < 10 ? `0${toDay}` : toDay}.${
        toMonth < 10 ? `0${toMonth}` : toMonth
      }.${toYear}`;
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
  const input = document.getElementById("myInput") as HTMLInputElement;
  const countSpan = document.getElementById("count");
  if (input !== null && countSpan !== null) {
    input.addEventListener("input", function () {
      console;
      countSpan.textContent = input.value.length.toString();
    });
  }

  const checkValidity = (): string => {
    console.log(examPhase);
    if (examPhase?.title === undefined || examPhase.title === "") {
      return "disabled";
    } else if (
      examPhase?.startDate === undefined ||
      examPhase?.endDate === undefined
    ) {
      return "disabled";
    } else {
      return "dark";
    }
  };
  return (
    <div className="relative flex flex-col items-center h-full">
      <div className=" text-h24 pt-[10vh] mb-12"> create exam phase</div>
      <p
        className="flex justify-end w-4/5 pb-1 text-chartGrey text-h16"
        id="characterCount"
      >
        <span id="count">0</span>/20
      </p>
      <input
        maxLength={20}
        autoComplete="off"
        type="text"
        id="myInput"
        name="name"
        required
        className="w-4/5 h-10 pl-2 border border-black rounded border-chartGrey "
        onChange={(i) => {
          console.log(i.target.value);
          const e = { ...examPhase };
          e.title = i.target.value;
          setExamPhase(e);
        }}
        placeholder="title..."
      />
      <button
        className="flex items-center w-4/5 h-10 pl-2 mt-6 border border-black rounded border-chartGrey text-tahiti"
        onClick={() => {
          if (showCalender) {
            setShowCalender(false);
          } else {
            setShowCalender(true);
          }
        }}
      >
        <input
          // id="name"
          required
          className={"w-full text-dark"}
          onClick={() => {
            if (showCalender) {
              setShowCalender(false);
            } else {
              setShowCalender(true);
            }
          }}
          onChange={(i) => {
            console.log(i.target.value);
            const e = { ...examPhase };
            e.title = i.target.value;
            setExamPhase(e);
          }}
          value={getDate()}
          disabled
          placeholder={"dd.mm.yyyy - dd.mm.yyyy"}
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
          // allowPartialRange={true}
          formatShortWeekday={(_locale, value) =>
            ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][value.getDay()]
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
      <div className="absolute bottom-0 flex items-end justify-center pb-16">
        <CustomButton
          variant={checkValidity() as buttonVariant}
          className=""
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
                if (setWhichTimer !== undefined) {
                  setWhichTimer(WhichTimer.STUDY);
                }
              }
            }
          }}
        >
          create
        </CustomButton>
      </div>
    </div>
  );
}
