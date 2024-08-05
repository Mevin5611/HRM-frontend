import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import toast from 'react-hot-toast'

const UserProfile = () => {
  const { user, dispatch } = useAuthContext();
  const [jobrole,setJobRole] = useState(user?.user?.jobrole)
  const [mob,setMob] = useState(user?.user?.mob)

  const handleUpdate = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filereader = new FileReader();
      filereader.onloadend = async () => {
        const profileImage = filereader.result;
        const response = await fetch("/api/user/updateProfile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ profileImage }),
        });
        const json = await response.json();
        if (response.ok) {
          const updatedUser = {
            ...user,
            user: {
              ...user.user,
              profileImage: json.profileImage,
            },
          };
          dispatch({
            type: "UPDATE_PROFILE",
            payload: { profileImage: json.profileImage },
          });
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      };
      filereader.readAsDataURL(file);
    }
  };

  const handlInfo = async()=>{
    try {
      
      const response = await fetch("/api/user/updateUserInfo",{
        method:'PUT',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body:JSON.stringify({
          jobrole,
          mob
        }),
      })
      const json = await response.json();
      if(response.ok){
       toast.success("Successfully Updated")
        const updatedUser = {
          ...user,
          user: {
            ...user.user,
            jobrole: json.jobrole,
            mob:json.mob,
          },
        };
        dispatch({
          type: "UPDATE_USERINFO",
          payload: { jobrole: json.jobrole,
            mob:json.mob },
        });
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      if(!response.ok){
        toast.error("Something Went Wrong")
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className=" flex ms-8 md:ms-0 justify-center items-center ">
      <div className="mt-[125px] flex flex-col justify-center items-center w-full border border-primary p-20 mr-10 min-h-[550px]">
        <div className="">
          <label htmlFor="profileImage" className="avatar cursor-pointer">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img
                src={
                  user?.user?.profileImage?.url ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="Profile"
              />
            </div>
          </label>
          <input
            id="profileImage"
            onChange={handleUpdate}
            name="profileImage"
            type="file"
            accept="image/png,image/jpg,image/jpeg,image/webp"
            className="hidden"
          />
        </div>

        <input
          value={jobrole}
          type="text"
          placeholder="Type Your Role"
          className="input input-bordered input-primary w-full max-w-xs mt-5 "
          onChange={(e)=>setJobRole(e.target.value)}
        />
        <input
          value={user?.user?.email}
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs mt-3 cursor-not-allowed"
        />
        <input
          value={mob}
          type="text"
          placeholder="Type Your Mob"
          className="input input-bordered input-primary w-full max-w-xs mt-3"
          onChange={(e)=> setMob(e.target.value)}
        />
        <div className="w-full  flex justify-end mt-10 items-center">
        <button onClick={ user?.user?.jobrole !== jobrole || user?.user?.mob !== mob ? handlInfo : null } className={`btn btn-outline btn-success hover:!text-white   ${user?.user?.jobrole !== jobrole || user?.user?.mob !== mob ? 'cursor-pointer' : 'cursor-not-allowed' } `}>Update</button>

        </div>
        
      </div>
    </div>
  );
};

export default UserProfile;
