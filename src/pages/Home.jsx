import React, { useState } from "react";

import Dashboard from "../components/Dashboard";
import Employees from "../components/Employees";
import Attendances from "../components/Attendances";
import LeavRequests from "../components/LeavRequests";
import LeaveStatus from "../components/LeaveStatus";
import AllLeaveStatus from "../components/AllLeaveStatus";
import PaySlip from "../components/PaySlip";
import ViewPayslip from "../components/ViewPayslip";
import Viewreport from "../components/Viewreport";
import ViewUsers from "../components/ViewUsers";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import AttendanceCalendar from "../components/AttendanceCalendar";
import { RiBillLine } from "react-icons/ri";
import { useLogout } from "../hooks/useLogout";
import UserProfile from "../components/UserProfile";
import ChagePassword from "../components/ChagePassword";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { useCollapseContext } from "../hooks/useCollapseContext";

const Home = () => {
  const {isCollapse,dispatch} = useCollapseContext()


  const { user } = useAuthContext();
  const [active, setActive] = useState(
user && user?.user?.role === "Employee" ? 1 :0
  );
  const { logout } = useLogout();

  const handleLogout = ()=>{
    logout()
  }

  return (
    <div class="min-h-screen flex w-full ">
      <div className="w-[15%]  text-white/60 z-50 ">
        <div class="fixed flex flex-col top-[70px] bg-[#1D232A] text-white/60 h-full  col-span-8 border-r border-slate-600">
          <div class="overflow-y-auto overflow-x-hidden flex-grow">
            <div className="flex justify-center mt-4 block md:hidden" >
              {isCollapse ? <IoIosArrowDropright onClick={()=>dispatch({type:'NOTISCOLLAPSE'})} size={25}/> : <IoIosArrowDropleft onClick={()=>dispatch({type:'ISCOLLAPSE'})} size={25}/>}
             
             

            </div>
            <ul class="flex flex-col space-y-1">
              <li class="px-5">
                <div class="flex flex-row items-center h-8">
                  {
                    !isCollapse && (
                      <div class="text-sm font-light tracking-wide text-white/60">
                    Menu
                  </div>
                    )
                  }
                </div>
              </li>
              {user && user?.user?.role === "Employee" && (
                <li onClick={() => setActive(1)}>
                  <a
                    href="#"
                    class="relative flex flex-row items-center h-11 focus:outline-none  text-white/60 hover:bg-black/40 hover:text-white/80 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  >
                    <span class="inline-flex justify-center items-center ml-4">
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        ></path>
                      </svg>
                    </span>
                    {
                      !isCollapse && (
                        <span
                      
                      class="ml-2 text-sm tracking-wide truncate"
                    >
                      Dashboard
                    </span>
                      )
                    }
                  </a>
                </li>
              )}
              {user && user?.user?.role === "Manager" && (
                <li onClick={() => setActive(2)}>
                  <a
                    href="#"
                    class="relative flex flex-row items-center h-11 focus:outline-none  text-white/60 hover:bg-black/40 hover:text-white/80 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  >
                    <span class="inline-flex justify-center items-center ml-4">
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        ></path>
                      </svg>
                    </span>
                    {
                      !isCollapse && (
                        <span
                      
                      class="ml-2 text-sm tracking-wide truncate"
                    >
                      Employee
                    </span>
                      )
                    }
                  </a>
                </li>
              )}
              {user && user?.user?.role === "Employee" ? (
                
                  <li onClick={() => setActive(10)}>
                    <a
                    href="#"
                    class="relative flex flex-row items-center h-11 focus:outline-none  text-white/60 hover:bg-black/40 hover:text-white/80 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  >
                    <span class="inline-flex justify-center items-center ml-4">
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        ></path>
                      </svg>
                    </span>
                    {
                      !isCollapse && (
                        <span
                      
                      class="ml-2 text-sm tracking-wide truncate"
                    >
                      Attendance
                    </span>
                      )
                    }
                    </a>
                  </li>
                
              ) : (
                <li onClick={() => setActive(3)}>
                  <a
                    href="#"
                    class="relative flex flex-row items-center h-11 focus:outline-none  text-white/60 hover:bg-black/40 hover:text-white/80 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      ></path>
                    </svg>
                  </span>
                  {
                      !isCollapse && (
                        <span
                      
                      class="ml-2 text-sm tracking-wide truncate"
                    >
                      Attendance
                    </span>
                      )
                    }
                  </a>
                </li>
              )}
              <li onClick={
                      user && user?.user?.role === "Manager"
                        ? () => setActive(4)
                        : user?.user?.role === "Admin"
                        ? () => setActive(6)
                        : () => setActive(5)
                    }>
                <a
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none  text-white/60 hover:bg-black/40 hover:text-white/80 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      ></path>
                    </svg>
                  </span>
                  {
                    !isCollapse && (
                      <span
                    
                    class="ml-2 text-sm tracking-wide truncate"
                  >
                    {user && user?.user?.role === "Manager"
                      ? "Leave Request"
                      : "Leave Status"}
                  </span>
                    )
                  }
                </a>
              </li>
              {user && user?.user?.role === "Admin" ? (
                <li onClick={() => setActive(7)}>
                  <a
                    href="#"
                    class="relative flex flex-row items-center h-11 focus:outline-none  text-white/60 hover:bg-black/40 hover:text-white/80 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  >
                    <span class="inline-flex justify-center items-center ml-4">
                    <RiBillLine size={20} />
                    </span>
                    {
                      !isCollapse && (
                        <span
                      
                      class="ml-2 text-sm tracking-wide truncate"
                    >
                      Manage Useres
                    </span>
                      )
                    }
                  </a>
                </li>
              ) : (
                user &&
                user?.user?.role === "Employee" && (
                  <li onClick={() => setActive(8)}>
                    <a
                      href="#"
                      class="relative flex flex-row items-center h-11 focus:outline-none  text-white/60 hover:bg-black/40 hover:text-white/80 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                    >
                      <span class="inline-flex justify-center items-center ml-4">
                      <RiBillLine size={20} />
                      </span>
                      {
                      !isCollapse && (
                        <span
                      
                      class="ml-2 text-sm tracking-wide truncate"
                    >
                      View Payslip
                    </span>
                      )
                    }
                    </a>
                  </li>
                )
              )}

              {user && user?.user?.role === "Admin" && (
                <li onClick={() => setActive(9)}>
                  <a
                    href="#"
                    class="relative flex flex-row items-center h-11 focus:outline-none  text-white/60 hover:bg-black/40 hover:text-white/80 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  >
                    <span class="inline-flex justify-center items-center ml-4">
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        ></path>
                      </svg>
                    </span>
                    {
                      !isCollapse && (
                        <span
                      
                      class="ml-2 text-sm tracking-wide truncate"
                    >
                      Report
                    </span>
                      )
                    }
                  </a>
                </li>
              )}
              <li class="px-5">
                <div class="flex flex-row items-center h-8">
                  {!isCollapse && (
                    <div class="text-sm font-light tracking-wide text-white/60">
                    Settings
                  </div>
                  )}
                </div>
              </li>
              <li onClick={() => setActive(12)}>
                <a
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none  text-white/60 hover:bg-black/40 hover:text-white/80 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </span>
                  {
                      !isCollapse && (
                        <span
                      
                      class="ml-2 text-sm tracking-wide truncate"
                    >
                      Profile
                    </span>
                      )
                    }
                </a>
              </li>
              <li onClick={() => setActive(13)}>
                <a
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none  text-white/60 hover:bg-black/40 hover:text-white/80 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </span>
                  {
                      !isCollapse && (
                        <span
                      
                      class="ml-2 text-sm tracking-wide truncate"
                    >
                      Settings
                    </span>
                      )
                    }
                </a>
              </li>
              <li onClick={handleLogout}>
                <a
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none  text-white/60 hover:bg-black/40 hover:text-white/80 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </span>
                  {
                      !isCollapse && (
                        <span
                      
                      class="ml-2 text-sm tracking-wide truncate"
                    >
                      Logout
                    </span>
                      )
                    }
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-[95%] ">
        <div className=" bg-base min-h-screen rounded-md ">
          {active === 1 && <Dashboard />}
          {user && user?.user?.role === "Manager" && active === 2 && (
            <Employees />
          )}
          {user && user?.user?.role === "Employee" && active === 10 && (
            <AttendanceCalendar/>
          )}
          {user && user?.user?.role !== "Employee" && active === 3 && (
            <Attendances />
          )}
          {user && user?.user?.role === "Manager" && active === 4 && (
            <LeavRequests />
          )}
          {user && user?.user?.role === "Employee" && active === 5 && (
            <LeaveStatus />
          )}
          {user && user?.user?.role === "Admin" && active === 7 && <PaySlip />}
          {user && user?.user?.role === "Admin" && active === 6 && (
            <AllLeaveStatus />
          )}
          {user && user?.user?.role === "Employee" && active === 8 && (
            <ViewPayslip />
          )}
          {user && user?.user?.role === "Admin" && active === 9 && <Viewreport />}
          {user && user?.user?.role === "Admin" && active === 11 && <ViewUsers />}
          {active === 12 && <UserProfile/>}
          {active === 13 && <ChagePassword/>}
        </div>
      </div>
    </div>
  );
};

export default Home;
