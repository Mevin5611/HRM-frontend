import React from "react";
import gif from "../assets/gifs/3d-techny-project-management-teamwork-and-integration.gif";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="mt-[70px] h-screen">
      <div className="w-full flex  min-h-screen ">
        <div className="w-full flex flex-col md:flex-row justify-start mt-10">
          <div className="md:bg-hero md:w-[85%] md:h-[85%] rounded-r-full flex flex-col md:flex-row justify-center items-center">
            <div className="md:w-[40%] w-full order-1 md:order-2 flex justify-center items-center">
              <img src={gif} alt="" />
            </div>
            <div className="md:w-[60%] w-full order-2 md:order-1 ps-5 md:ps-20 flex flex-col items-center">
              <h1 className="text-[30px] md:text-[50px] font-bold text-center md:text-left p-10 md:p-0">
                Empower Your Workforce with Efficient HR Management
              </h1>
              <p className="font-medium mt-5 text-center md:text-left p-5 md:p-0">
                Streamline Employee Management, Attendance, Leave Applications,
                Salary Management, and Performance Tracking
              </p>
              <div className="flex justify-center md:justify-start w-full mt-5">
                <Link to={"/home"}>
                  <button className="bg-[#578DE7] rounded-md text-white font-medium p-3 mb-10 md:mb-0">
                    Getting Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
