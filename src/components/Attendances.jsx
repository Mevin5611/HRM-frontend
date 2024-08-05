import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import dateFormat from "dateformat";

const Attendances = () => {
  const { user } = useAuthContext();
  const [employee, setEmployee] = useState();
  const [attendance, setAttendance] = useState();

  useEffect(() => {
    const fetchAttenadance = async () => {
      try {
        const response = await fetch("https://hrm-backend-zjvm.onrender.com/api/hrs/getAttendances", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }
        const json = await response.json();
        setAttendance(json);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };
    if (user) {
      fetchAttenadance();
    }
  }, [user]);

  console.log(attendance);

  return (
    <div className="items-center pt-28 p-10 text-white/60">
      <h1 className="text-xl font-bold">Attendances</h1>
      <div>
        {attendance &&
          attendance.map((item, index) => (
            <div key={index} className=" mt-3 text-white">
              <details className="collapse border-b border-t border-gray-600">
                <summary className="collapse-title text-base font-medium">
                  {item.name}
                </summary>
                <div className="collapse-content">
                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Attendance Status</th>
                          <th>Checkin Time</th>
                          <th>Checkout Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        {
                          item && item.attendance.map((attendance,index)=>(
                            <tr> 
                            <td>{dateFormat(attendance?.checkindate, "dddd, mmmm dS, yyyy")}</td>
                            <td>{attendance?.status}</td>
                            <td>{dateFormat(attendance?.checkindate,"h:MM:ss TT")}</td>
                            <td>{dateFormat(attendance?.checkoutdate,"h:MM:ss TT")}</td>
                            
                            
                          </tr>
                          ))
                        }
                        
                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </details>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Attendances;
