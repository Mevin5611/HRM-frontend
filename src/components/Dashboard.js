import React from "react";
import AttendanceForm from "./AttendenceForm";
import ApplyLeav from "./ApplyLeav";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Perfomance from "./Perfomance";

function Dashboard() {
  const { user } = useAuthContext();
  return (
    <div className="flex flex-col md:flex-row justify-between items-center pt-28 p-10 text-white/60">
      <div className="w-full md:w-[70%] ">
        <p className="text-xl md:text-2xl font-bold mb-10 ">Perfomance</p>
        <Perfomance />
      </div>
      {user && user.user.role === "Employee" && (
        <div className=" mb-10 md:mb-0  mt-10 md:mt-0 md:w-[30%]">
          <AttendanceForm />

          <ApplyLeav />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
