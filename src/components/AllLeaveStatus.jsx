import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import dateformat from 'dateformat'

const AllLeaveStatus = () => {
    const { user } = useAuthContext();
  const [leave, setLeave] = useState();
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await fetch("https://hrm-backend-zjvm.onrender.com/api/hrs/getLeaveRequest", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }
        const json = await response.json();
        setLeave(json);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };
    if (user) {
      fetchLeaves();
    }
  }, [user]);
  console.log(leave);
  return (
    <div className=" pt-28 p-10 text-white/60  " >
      <table className="table ">
        {/* head */}
        <thead>
          <tr>
            <th>.No</th>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Reason</th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {leave &&
            leave.map((item, index) => (
              <tr className=" border-t border-b border-slate-600">
                <th>{index + 1}</th>
                <th>{dateformat(item.createdAt,"dddd, mmmm dS, yyyy")}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.reason}</td>
                <td>
                <button
                className={
                  item.leav_status === "Approve"
                    ? " w-[110px] border border-green-500 text-green-500 p-2 rounded-lg font-semibold"
                    :item.leav_status === "reject" ? " w-[110px] border-red-500 border text-red-500 p-2 rounded-lg font-semibold" :
                    "border border-yellow-500 text-yellow-500 w-[110px] p-2 rounded-lg font-semibold"
                }
              >
                {
                  item.leav_status === "Approve"
                    ? "Approved"
                    : item.leav_status === "reject" ? "Rejected" : "Processing"
                }
                
              </button>
                </td>
                
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllLeaveStatus
