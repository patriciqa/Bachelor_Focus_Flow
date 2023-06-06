import { ExamPhase } from "@/types/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addDays,
  addWeeks,
  isSameDay,
  lastDayOfWeek,
  startOfWeek,
  subWeeks,
} from "date-fns";
import moment from "moment";
import "moment/locale/de-ch";
import { useEffect, useState } from "react";
const WeekCalendar = ({
  activePhase,
  selectedDate,
  setSelectedDate,
}: {
  activePhase: ExamPhase;
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  const changeWeekHandle = (btnType: string) => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
    }
  };

  const onDateClickHandle = (day: Date) => {
    setSelectedDate(day);
  };

  const getDate = (): any => {
    let start = "";
    let end = "";
    if (activePhase) {
      start = moment(activePhase.startDate).format("L");
      end = moment(activePhase.endDate).format("L");
    }

    return `${start} – ${end}`;
  };

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div className="flex justify-between w-full pt-4 pb-6">
        <div className="flex">
          {initialRenderComplete && (
            <FontAwesomeIcon
              icon={["fas", "calendar"]}
              className={"text-[24px]"}
            />
          )}
          <span className="pl-4 text-h24">
            {moment(currentMonth).format(dateFormat)}
          </span>
        </div>
        <div className="items-end justify-end text-right font-meium text-h16 text-chartGrey flex-nowrap">
          <p> {activePhase?.title}</p>
          <p className="flex flex-nowrap">{getDate()}</p>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const d = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="flex-1 text-center text-h16 " key={i}>
          {d[i]}
        </div>
      );
    }
    return (
      <>
        <div className="flex flex-row w-full days">
          <div className="flex-1 text-center"></div>
          {days}
          <div className="flex-1 text-center"></div>
        </div>
      </>
    );
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = moment(day).format(dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`flex-1	text-center h-9  ${
              isSameDay(day, selectedDate)
                ? "border-b-2 border-black "
                : "bg-background"
            }`}
            key={i}
            onClick={() => {
              onDateClickHandle(cloneDay);
            }}
          >
            <div className="flex flex-col">
              <span className="number">{formattedDate}</span>
              {isSameDay(day, new Date()) && (
                <span className="today leading-[10px] font-bold">.</span>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div
          key="key"
          className="flex flex-row w-full pt-2 leading-5 font- text-h24 "
        >
          <div
            className="flex-1 text-center "
            onClick={() => changeWeekHandle("prev")}
          >
            {initialRenderComplete && (
              <FontAwesomeIcon icon={["fas", "chevron-left"]} />
            )}
          </div>
          {days}
          <div
            className="flex-1 text-center "
            onClick={() => changeWeekHandle("next")}
          >
            {initialRenderComplete && (
              <FontAwesomeIcon icon={["fas", "chevron-right"]} />
            )}{" "}
          </div>
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  return (
    <div className=" my-5 calendar w-[90vw] md:w-[50vw]">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default WeekCalendar;
