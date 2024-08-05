import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, subMonths, addMonths, getDay, addDays, isSameDay, isAfter, getMonth, getYear } from "date-fns";

// Function to get the second Saturday of a month
const getSecondSaturday = (date) => {
  const month = getMonth(date);
  const year = getYear(date);
  const firstDay = new Date(year, month, 1);
  const firstSaturday = 6 - firstDay.getDay() + 1; // Day of the first Saturday
  const secondSaturday = firstSaturday + 7; // Second Saturday
  return new Date(year, month, secondSaturday);
};

const AttendanceCalendar = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [previousMonthData, setPreviousMonthData] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch("https://hrm-backend-zjvm.onrender.com/api/hrs/getAttendance", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }
        const json = await response.json();
        setAttendanceData(json[0].attendance || []);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };
    if (user) {
      fetchAttendance();
    }
  }, [user]);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start, end });

  // Get the holidays
  const holidays = [];
  // Add Sundays
  daysInMonth.forEach(date => {
    if (getDay(date) === 0) {
      holidays.push(date);
    }
  });
  // Add second Saturday
  const secondSaturday = getSecondSaturday(currentDate);
  holidays.push(secondSaturday);

  const isHoliday = (date) => holidays.some(holiday => isSameDay(holiday, date));
  const isPresent = (date) => attendanceData.some(item => isSameDay(new Date(item.checkindate), date));

  const getStatusClass = (date) => {
    const today = new Date();
    if (isAfter(date, today)) return 'border border-white hover:bg-white hover:text-black text-white border';
    if (isHoliday(date)) return 'border border-yellow-500 hover:bg-yellow-500 text-white';
    if (isPresent(date)) return 'border border-green-500 hover:bg-green-500 text-white';
    return 'border border-red-500 hover:bg-red-500 text-white';
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleShowPrevMonthData = async () => {
    try {
      const prevMonth = subMonths(currentDate, 1);
      const startOfPrevMonth = startOfMonth(prevMonth);
      const endOfPrevMonth = endOfMonth(prevMonth);

      const response = await fetch("https://hrm-backend-zjvm.onrender.com/api/hrs/getAttendance", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch attendance data");
      }
      const json = await response.json();
      const prevMonthData = json[0].attendance.filter(item => {
        const checkinDate = new Date(item.checkindate);
        return checkinDate >= startOfPrevMonth && checkinDate <= endOfPrevMonth;
      });

      setPreviousMonthData(prevMonthData);
    } catch (error) {
      console.error("Error fetching previous month's data:", error);
    }
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const leadingDays = Array.from({ length: getDay(start) }, (_, i) => addDays(start, i - getDay(start)));
  const trailingDays = Array.from({ length: 6 - getDay(end) }, (_, i) => addDays(end, i + 1));

  return (
    <div className="p-4 mt-[100px]">
      <div className=" flex flex-col md:flex-row md:justify-between justify-start items-start md:items-center mb-4">
        <h2 className="text-xl  ms-8 md:text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
        <div className="flex  items-center justify-between gap-2 mt-5 md:mt-0 ms-8 md:ms-0">
          <div className="flex items-center justify-center">
            <div className="md:w-5 md:h-5 w-4 h-4 border border-green-500 hover:bg-green-500 rounded-sm"></div>
            <span className="ms-2 text-xs ">Present</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="md:w-5 md:h-5 w-4 h-4 border border-yellow-500 hover:bg-yellow-500 rounded-sm"></div>
            <span className="ms-2 text-xs">Holiday</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="md:w-5 md:h-5 w-4 h-4 border border-red-500 hover:bg-red-500 rounded-sm"></div>
            <span className="ms-2 text-xs">Absent</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="md:w-5 md:h-5 w-4 h-4 border border-white hover:bg-white rounded-sm"></div>
            <span className="ms-2 text-xs">Days</span>
          </div>
        </div>
        <div className="flex justify-between gap-32 md:gap-4 ms-7 md:ms-0 mt-5 md:mt-0">
          <button onClick={handlePrevMonth} className="btn btn-primary w-20 text-xs md:text-base md:w-fit">Previous Month</button>
          {/* <button onClick={handleShowPrevMonthData} className="btn btn-secondary">Show Previous Month Data</button> */}
          <button onClick={handleNextMonth} className="btn btn-primary w-20 text-xs md:text-base md:w-fit">Next Month</button>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10 w-full">

      <div className="grid grid-cols-7 gap-2 bg-base shadow-md shadow-slate-600 p-0 md:p-5 text-xs md:text-base rounded-md w-[80%]">
        {daysOfWeek.map(day => (
          <div key={day} className=" w-7 h-7 md:w-full md:h-full flex justify-center items-center md:p-2 md:text-center text-white/80 font-bold">{day}</div>
        ))}
        {leadingDays.map(date => (
          <div key={date} className="w-7 h-7 md:w-full md:h-full flex justify-center items-center md:p-2 md:text-center rounded bg-gray-200 ">
            {format(date, 'd')}
          </div>
        ))}
        {daysInMonth.map(date => (
          <div key={date} className={`w-7 h-7 md:w-full md:h-full flex justify-center items-center md:p-2 md:text-center rounded ${getStatusClass(date)}`}>
            {format(date, 'd')}
          </div>
        ))}
        {trailingDays.map(date => (
          <div key={date} className="w-7 h-7 md:w-full md:h-full flex justify-center items-center md:p-2 md:text-center rounded bg-gray-200 ">
            {format(date, 'd')}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;
