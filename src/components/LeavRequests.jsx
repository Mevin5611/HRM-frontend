import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const LeaveRequests = () => {
  const { user } = useAuthContext();
  const [leave, setLeave] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await fetch("/api/hrs/getLeaveRequest", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch leave data");
        }
        const json = await response.json();
        setLeave(json);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leave data:", error);
        setLoading(false);
      }
    };
    if (user) {
      fetchLeaves();
    }
  }, [user]);

  const handleStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/hrs/LeaveStatus`, {
        method: "POST",
        body: JSON.stringify({ id, status }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update leave status");
      }

      const updatedLeave = await response.json();
      setLeave((prevLeave) =>
        prevLeave.map((item) =>
          item._id === id ? { ...item, leav_status: status } : item
        )
      );
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-28 p-10">
      <table className="table">
        <thead>
          <tr>
            <th>.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Reason</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leave &&
            leave
              .filter(
                (item) =>
                  item.leav_status !== "Approve" && item.leav_status !== "Reject"
              )
              .map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.reason}</td>
                  <td>
                    <button
                      onClick={() => handleStatus(item._id, "Approve")}
                      className="btn btn-outline btn-success"
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleStatus(item._id, "Reject")}
                      className="btn btn-outline btn-error"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequests;
