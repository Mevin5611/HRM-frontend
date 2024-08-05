import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

function Employees() {
  const { user } = useAuthContext();
  const [employee, setEmployee] = useState();
  const [basic, setBasic] = useState();
  const [incentive, setIncentive] = useState();
  const [id, setId] = useState();
  const [workdays, setWorkDays] = useState();
  const [active, setActive] = useState(0);
  const [percentage, setPercentage] = useState();
  const [date, setDate] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/hrs/getEmploye", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch Employee data");
        }
        const json = await response.json();
        setEmployee(json);
      } catch (error) {
        console.error("Error fetching Employee:", error);
      }
    };
    if (user) {
      fetchEmployees();
    }
  }, [user]);
  console.log(employee);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salary = { basic, incentive, date, workdays, id };

    const response = await fetch("/api/hrs/paySalary", {
      method: "POST",
      body: JSON.stringify(salary),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      setId("");
      setBasic("");
      setIncentive("");
      setWorkDays("");
      setActive(0);
      setDate("");
    }
  };
  const handleclear = () => {
    setId("");
    setBasic("");
    setIncentive("");
    setWorkDays("");
    setDate("");
  };
  const handlePerfomnce = async (e) => {
    e.preventDefault();

    const performanceData = { id, percentage, date };

    const response = await fetch("/api/hrs/addPerfomance", {
      method: "POST",
      body: JSON.stringify(performanceData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      setId("");
      setDate("");
      setPercentage(""); // Ensure this matches the state variable name for percentage
      setActive(0);
    }
  };
  const handleRole = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/hrs/updateUserRole/${id}`, {
      method: "PUT",
      body: JSON.stringify({ role }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      setId("");
      setRole("");
      setActive(0);
    }
  };
  return (
    <div className=" h-screen ">
      <div className="overflow-x-auto h-screen">
        <table className="table mt-20 p-10 ">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Job Role</th>
              {user && user.user.role === "Manager" && (
                <>
                  <th>Perfomance</th>
                  <th>Pay</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {employee &&
              employee.map((item, index) => (
                <tr className="border-b border-t border-gray-600 mt-2">
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.email}</td>
                  <td>{item.mob}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">
                      {item.jobrole}
                    </button>
                  </th>
                  {user && user.user.role === "Manager" && (
                    <>
                      <th onClick={() => setActive(2)}>
                        <button
                          onClick={() => setId(item._id)}
                          className="btn btn-outline btn-success"
                        >
                          Perfomance
                        </button>
                      </th>

                      <th onClick={() => setActive(1)}>
                        <button
                          onClick={() => setId(item._id)}
                          className="btn btn-primary"
                        >
                          Pay
                        </button>
                      </th>
                    </>
                  )}
                  {user && user.user.role === "Admin" && (
                    <th onClick={() => setActive(3)}>
                      <button
                        onClick={() => setId(item._id)}
                        className="btn btn-outline "
                      >
                        Change Role
                      </button>
                    </th>
                  )}
                </tr>
              ))}
          </tbody>

          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      {active === 1 ? (
        <div class=" flex   fixed p-10 md:p-0 ms-10 md:ms-0 justify-center items-center w-full inset-0 mt-10">
          <div class="relative p-4 w-full max-w-2xl ">
            <div class="relative bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg shadow text-white">
              <div class="flex items-center justify-between pt-4 ps-4 md:pt-5  rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold">Pay Salary {}</h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white mr-5"
                  onClick={() => setActive(0)}
                >
                  <svg
                    onClick={handleclear}
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <div className="">
                <form className="flex justify-center items-center m-10" onSubmit={handleSubmit}>
                  <div className="flex flex-col w-full max-w-sm">
                  <label htmlFor="">Basic :</label>
                  <input
                  className="input input-bordered w-full max-w-sm"
                    type="number"
                    onChange={(e) => setBasic(e.target.value)}
                    value={basic}
                  />
                  <label htmlFor="">Incentive :</label>
                  <input
                  className="input input-bordered w-full max-w-sm"
                    type="number"
                    onChange={(e) => setIncentive(e.target.value)}
                    value={incentive}
                  />
                  <label htmlFor="">Workdays:</label>
                  <input
                  className="input input-bordered w-full max-w-sm"
                    type="number"
                    onChange={(e) => setWorkDays(e.target.value)}
                    value={workdays}
                  />
                  <label htmlFor="">Date :</label>
                  <input
                  className="input input-bordered w-full max-w-sm"
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                  />

                  <div className="w-full max-w-sm flex justify-start mt-4">
                  <button className="mb-5 btn btn-outline btn-success ">Pay Salary</button>
                  </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        active === 2 && (
          <div class=" flex fixed p-16 ms-8 md:ms-0 md:p-0 justify-center items-center w-full inset-0 ">
            <div class="relative p-4 w-full max-w-2xl ">
              <div class="relative bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg shadow text-white">
                <div class="flex items-center justify-between p-4 md:p-5  rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold">Add Perfomance{}</h3>
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setActive(0)}
                  >
                    <svg
                      onClick={handleclear}
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="">
                  <form className="flex md:flex-row flex-col justify-between pb-10  m-5" onSubmit={handlePerfomnce}>
                    <div className="flex  flex-col">
                    <label htmlFor="">Perfomance :</label>
                    <input
                    className="input input-bordered w-full max-w-sm"
                      type="number"
                      onChange={(e) => setPercentage(e.target.value)}
                      value={percentage}
                    />
                    </div>
                    <div className="flex flex-col">
                    <label htmlFor="">Date :</label>
                    <input
                    className="input input-bordered w-full max-w-sm"
                      type="date"
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                    />
                    </div>

                    <button className=" btn btn-outline btn-success mt-6 w-[180px] ">
                      Add PerFomance
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      )}
      {active === 3 && (
        <div class=" flex   fixed  z-50 justify-center items-center w-full md:inset-0 mt-10">
          <div class="relative p-4 w-full max-w-xl ">
            <div class="relative bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg shadow text-white">
              <div class="flex items-center justify-center pt-4 ps-4 md:pt-5  rounded-t dark:border-gray-600">
                <h3 class="text-xl text-center font-semibold">
                  Change user role {}
                </h3>
                <button
                  type="button"
                  class="text-red-600 border border-red-600 hover:border-white bg-transparent hover:bg-gray-500 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white mr-5"
                  onClick={() => setActive(0)}
                >
                  <svg
                    onClick={handleclear}
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <div className="">
                <form className="create m-10" onSubmit={handleRole}>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="select w-full mb-4 "
                  >
                    <option disabled selected>
                      Select Role
                    </option>
                    <option>Employee</option>
                    <option>Manager</option>
                    <option>Admin</option>
                  </select>
                  <button className="btn btn-outline btn-success mb-10">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employees;
