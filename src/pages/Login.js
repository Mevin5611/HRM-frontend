import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const hadlesubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="mt-[150px] p-5 md:p-0">
      <form
        className="login  border border-gray-600 shadow-md shadow-slate-600"
        onSubmit={hadlesubmit}
      >
        <h3 className="text-[18px] font-bold pb-3">Login</h3>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">What is your Email?</span>
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
            <span className="label-text">What is your Password?</span>
          </div>
          <input
            type="Password"
            placeholder="Type here"
            className="input input-bordered w-full "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        <button className="btn btn-outline btn-info mt-5">Login</button>
        <p className="pt-3">
          Don't have an Account{" "}
          <Link className="text-blue-500" to="/signup">
            Register
          </Link>
        </p>
        {error && <div className="error bg-transparent flex items-center"><MdErrorOutline size={23} /><span className="ms-3">{error}</span></div>}
      </form>
    </div>
  );
};

export default Login;
