import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [mob, setMob] = useState("");
  const [jobrole, setJobrole] = useState("");
  const [address, setaddress] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();
  const hadlesubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, name, mob, address, jobrole);
  };

  return (
    <div className="md:mt-[125px] mt-[60px] p-5 md:p-0">
      <form
        className="login border border-gray-600 shadow-md shadow-slate-600"
        onSubmit={hadlesubmit}
      >
        <h3 className="text-[18px] font-bold pb-3">Signup</h3>
        <div className="flex gap-2">
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text"> Email?</span>
          </div>
          <input
            type="email"
            placeholder="Type here"
            className="input input-bordered w-full "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text"> Name?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        </div>
        <div className="flex gap-2">
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text"> Mobile no?</span>
          </div>
          <input
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full "
            onChange={(e)=> setMob(e.target.value)}
            value={mob}
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text"> Jobrole?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
            onChange={(e)=> setJobrole(e.target.value)}
            value={jobrole}
          />
        </label>
        </div>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text"> Address?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full "
            onChange={(e)=> setaddress(e.target.value)}
            value={address}
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text"> Password?</span>
          </div>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full "
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
          />
        </label>

        <button className="btn btn-outline btn-info mt-5">Signup</button>
        <p className="pt-3">
          Already have an Account{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </p>
        {error && (
          <div className="error bg-transparent flex items-center">
            <MdErrorOutline size={23} />
            <span className="ms-3">{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
