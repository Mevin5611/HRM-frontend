import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const AttendanceForm = () => {
  const { user } = useAuthContext();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Present");
  const [error, setError] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    if (user) {
      setEmail(user.user.email);
      setName(user.user.name);
    }
  }, [user]);

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
        setAttendanceData(json[0]?.attendance || []); // Provide a default empty array if json[0] or json[0].attendance is undefined
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    if (user) {
      fetchAttendance();
    }
  }, [user]); // Remove attendanceData from the dependency array

  const handleCheckin = async () => {
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const Attendance = { email, status, name };

    const response = await fetch("https://hrm-backend-zjvm.onrender.com/api/hrs/", {
      method: "POST",
      body: JSON.stringify(Attendance),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      // Update local attendance data to reflect the check-in
      setAttendanceData((prevData) => [
        ...prevData,
        { checkindate: new Date().toISOString(), status: "Present" },
      ]);
    }
  };

  const handleClick = async () => {
    const response = await fetch("https://hrm-backend-zjvm.onrender.com/api/hrs/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      setAttendanceData((prevData) => {
        // Find the most recent check-in and update its checkoutdate
        const updatedData = [...prevData];
        const latestCheckin = updatedData.find(
          (item) =>
            new Date(item.checkindate).toDateString() === new Date().toDateString() && !item.checkoutdate
        );
        if (latestCheckin) {
          latestCheckin.checkoutdate = new Date().toISOString();
        }
        return updatedData;
      });
    }
  };

  const todayAttendance = attendanceData.find(
    (item) =>
      new Date(item.checkindate).toDateString() === new Date().toDateString()
  );

  return (
    <div className="">
      <h3 className="text-[18px] font-bold pb-3">Mark Today's Attendance</h3>
      {error && <div className="error">{error}</div>}
      {todayAttendance && todayAttendance.status === "Present" ? (
        todayAttendance.checkoutdate ? (
          <button className="bg-gray-600 btn !cursor-not-allowed">Check out</button>
        ) : (
          <button onClick={handleClick} className="border border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-black btn">
            Check out
          </button>
        )
      ) : (
        <button onClick={handleCheckin} className="border border-green-500 hover:bg-green-500 text-green-500 hover:text-black btn">
          Check in
        </button>
      )}
    </div>
  );
};

export default AttendanceForm;
