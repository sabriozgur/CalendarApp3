import React, { useState, setState } from "react";
import "./styles.css";

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function CalendarDay(props) {
  function isSameDay(firstDate, secondDate) {
    if (firstDate === undefined || secondDate === undefined) {
      return false;
    }
    if (firstDate.getDate() !== secondDate.getDate()) {
      return false;
    } else if (firstDate.getMonth() !== secondDate.getMonth()) {
      return false;
    } else if (firstDate.getYear() !== secondDate.getYear()) {
      return false;
    }
    return true;
  }

  const namesOfDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let dayIndexOfWeek = props.date.getDay();
  const dayName = namesOfDay[dayIndexOfWeek];
  const dayOfMonth = props.date.getDate();

  const isToday = isSameDay(new Date(), props.date);
  let className;
  if (isSameDay(props.activeDate, props.date)) {
    className = "calendar-day active-day";
  } else if (isToday) {
    className = "calendar-day today";
  } else {
    className = "calendar-day";
  }

  return (
    <div
      className={className}
      onClick={() => props.childToParentCallback(props.date)}
    >
      <p>{dayName}</p>
      <p>{dayOfMonth}</p>
    </div>
  );
}

function Calendar(props) {
  const [date, setDate] = useState(props.date);
  const [activeDate, setActiveDate] = useState(undefined);

  function goToNextWeek() {
    setDate(date.addDays(7));
  }

  function goToPreviousWeek() {
    setDate(date.addDays(-7));
  }

  function setActive(date) {
    setActiveDate(date);
  }

  const namesOfMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let dayOfWeek = date.getDay();
  let monthIndex = date.getMonth();
  let mondayOfWeek = date.addDays(-(dayOfWeek - 1));
  const DAYS_IN_WEEK = 7;
  const days = [];
  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    let day_of_component = mondayOfWeek.addDays(i);
    days.push(
      <CalendarDay
        date={day_of_component}
        childToParentCallback={setActive}
        activeDate={activeDate}
      />
    );
  }
  return (
    <div className="calendar">
      <h1>{namesOfMonth[monthIndex]}</h1>
      <tbody>{days}</tbody>
      <button className="button next" onClick={goToNextWeek}>
        Next
      </button>
      <button className="button prev" onClick={goToPreviousWeek}>
        Prev
      </button>
    </div>
  );
}

export default function CalendarApp() {
  return (
    <div>
      <Calendar date={new Date()} />
    </div>
  );
}
