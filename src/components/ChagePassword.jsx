import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import OtpInput from "react-otp-input";
import { MdErrorOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

function ChagePassword() {
  const { user } = useAuthContext();
  const [active, setActive] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [success,setSuccess] = useState("");

  useEffect(() => {
    if (active === 1 && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [timeLeft, active]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  const handleVerify = async () => {
    try {
      const response = await fetch("/api/user/sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setActive(1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (otp) => setOtp(otp);

  const handlepswchange = async () => {
    try {
      const response = await fetch("/api/user/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          otp,
          newPassword,
          confirmPassword,
        }),
      });
      const json = await response.json();
      if (response.ok) {
        setSuccess(json.message)
        setNewPassword("");
        setConfirmPassword("");
        setOtp("");
        setTimeout(() => {
          setActive(0)
          setSuccess('')
        }, 3000);
      }
      if (!response.ok) {
        console.log(json);
        setErr(json.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" flex ms-8 md:ms-0 justify-center items-center ">
      <div className="mt-[125px] flex flex-col justify-center items-center w-full border border-primary md:p-20 mr-10 min-h-[550px]">
        <div className="w-full max-w-sm mt-3  shadow-none md:shadow-sm md:shadow-slate-600 flex flex-col justify-center items-center p-10 md:p-5">
          <div className="w-full max-w-xs flex justify-center items-center">
            <h3 className=" text-xl font-bold mb-4">Change Password</h3>
          </div>
          {active === 0 && (
            <>
              <input
                value={user?.user?.email}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-primary w-full max-w-xs mt-3 cursor-not-allowed"
              />
              <div className="w-full max-w-xs flex justify-end items-center mt-5">
                <button
                  onClick={handleVerify}
                  className="h-10 btn hover:bg-blue-600  bg-blue-600 text-white/80"
                >
                  Verify Email
                </button>
              </div>
            </>
          )}
          {active === 1 && (
            <>
              {err && (
                <div className="error w-full bg-transparent flex items-center">
                  <MdErrorOutline size={23} />
                  <span className="ms-3">{err}</span>
                </div>
              )} 
              {success && (
                <div className="success w-full bg-transparent flex items-center">
                  <RiLockPasswordLine size={23} />
                  <span className="ms-3">{success}</span>
                </div>
              )}
              <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                renderSeparator={<span> </span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  border: "1px solid #7480ff",
                  borderRadius: "8px",
                  width: "40px",
                  height: "40px",
                  fontSize: "20px",
                  fontWeight: "800",
                  backgroundColor: "transparent",
                  margin: "3px",
                }}
              />
              <div className="w-full flex justify-end mt-1">
                <span className="mr-3">{formatTime(timeLeft)}</span>
              </div>
              <label className="form-control w-full mt-5">
                <div className="label">
                  <span className="label-text">New Password</span>
                </div>
                <input
                  value={newPassword}
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered input-primary w-full  "
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
              <label className="form-control w-full mt-5">
                <div className="label">
                  <span className="label-text">Confirm Password</span>
                </div>
                <input
                  value={confirmPassword}
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered input-primary w-full  "
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              <div className="w-full max-w-xs flex justify-end items-center mt-5">
                <button
                  onClick={handlepswchange}
                  className="h-10 btn hover:bg-blue-600  bg-blue-600 text-white/80"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChagePassword;
