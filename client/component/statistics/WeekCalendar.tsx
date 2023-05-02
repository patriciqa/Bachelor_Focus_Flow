import { useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from "date-fns";

const WeekCalendar = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));

  const changeWeekHandle = (btnType: string) => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day: Date) => {
    setSelectedDate(day);
  };

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div className="flex flex-row w-full flex-middle">
        <div className="flex-grow"></div>
        <div className="flex-grow text-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="flex-grow text-right"></div>
      </div>
    );
  };
  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="flex-grow text-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="flex flex-row w-full days">{days}</div>;
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`flex-grow h-5  ${
              isSameDay(day, new Date())
                ? "today bg-silver"
                : isSameDay(day, selectedDate)
                ? "bg-tahiti "
                : "bg-white"
            }`}
            key={i}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              console.log(dayStr);
              onDateClickHandle(cloneDay);
            }}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div key="key" className="flex flex-row w-full">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };
  const renderFooter = () => {
    return (
      <div className="flex flex-row w-full header flex-middle">
        <div className="flex-grow col-start">
          <div className="" onClick={() => changeWeekHandle("prev")}>
            prev week
          </div>
        </div>
        <div>{currentWeek}</div>
        <div
          className="flex-grow text-right"
          onClick={() => changeWeekHandle("next")}
        >
          <div className="">next week</div>
        </div>
      </div>
    );
  };
  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderFooter()}
    </div>
  );
};

export default WeekCalendar;
