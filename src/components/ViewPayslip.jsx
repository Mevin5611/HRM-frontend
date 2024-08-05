import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import html2canvaspro from "html2canvas-pro";
import jsPDF from "jspdf";
import { HiOutlineDocumentDownload } from "react-icons/hi";

const ViewPayslip = () => {
  const { user } = useAuthContext();
  const [employee, setEmployee] = useState();
  const [id, setId] = useState();
  const [active, setActive] = useState(false);
  const [total, setTotal] = useState();

  useEffect(() => {
    setEmployee(user.user);
  }, []);

  const slip = user.user.payslip.find((item) => item._id === id);
  useEffect(() => {
    if (slip) {
      const ttl = slip.basic + slip.incentive;
      setTotal(ttl);
    }
  }, [slip]);

  const handlePdf = () => {
    const input = document.getElementById("divToPrint");
    html2canvaspro(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  return (
    <>
      <div className=" pt-28 p-10 text-white/60">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employee &&
                employee.payslip.map((item, index) => (
                  <tr className=" border-b border-t shadow-sm border-slate-600">
                    <th>{index + 1}</th>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>
                      <button
                        onClick={() => {
                          setId(item._id);
                          setActive(true);
                        }}
                        className="btn btn-outline btn-primary"
                      >
                        Pay Slip
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {active && slip && (
        <div className=" flex fixed overflow-scroll pt-[250px] z-50 justify-center items-center w-full md:inset-0">
          <div className="relative p-4 w-full max-w-4xl">
            <div className="relative bg-white rounded-lg shadow text-black">
              <div className="flex items-center justify-between p-4 md:p-5  rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold  text">Pay slip {}</h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setActive(!active)}
                >
                  <svg
                    className="w-3 h-3"
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
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="">
                <div className="">
                  <div
                    onClick={handlePdf}
                    className="flex cursor-pointer font-semibold items-center ps-5"
                  >
                    <p>Download</p>
                    <HiOutlineDocumentDownload size={25} />
                  </div>

                  <div id="divToPrint" className="bg-white p-28">
                    <div className="text-center mb-2 leading-none">
                      <h6 className="font-bold">Payslip</h6>
                      <span className="font-normal ">
                        Payment slip for the month of June 2021
                      </span>
                    </div>

                    <div className="grid grid-cols-10 gap-4">
                      <div className="col-span-10">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-bold">EMP Code</span>
                            <small className="ml-3">{employee?._id}</small>
                          </div>
                          <div>
                            <span className="font-bold">EMP Name</span>
                            <small className="ml-3">{employee?.name}</small>
                          </div>
                          <div>
                            <span className="font-bold">PF No.</span>
                            <small className="ml-3">101523065714</small>
                          </div>
                          <div>
                            <span className="font-bold">NOD</span>
                            <small className="ml-3">{slip?.workDays}</small>
                          </div>
                          <div>
                            <span className="font-bold">ESI No.</span>
                            <small className="ml-3"></small>
                          </div>
                          <div>
                            <span className="font-bold">Mode of Pay</span>
                            <small className="ml-3">SBI</small>
                          </div>
                          <div>
                            <span className="font-bold">Designation</span>
                            <small className="ml-3">Marketing Staff (MK)</small>
                          </div>
                          <div>
                            <span className="font-bold">Ac No.</span>
                            <small className="ml-3">*******0701</small>
                          </div>
                        </div>
                        <table className="mt-4 w-full border-collapse border border-gray-300">
                          <thead className="bg-gray-800 text-white">
                            <tr>
                              <th className="border border-gray-300 p-2">
                                Earnings
                              </th>
                              <th className="border border-gray-300 p-2">Amount</th>
                              <th className="border border-gray-300 p-2">
                                Deductions
                              </th>
                              <th className="border border-gray-300 p-2">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 p-2">Basic</td>
                              <td className="border border-gray-300 p-2">
                                {slip.basic}
                              </td>
                            </tr>

                            <tr>
                              <td className="border border-gray-300 p-2">
                                Sales Incentive
                              </td>
                              <td className="border border-gray-300 p-2">
                                {slip.incentive}
                              </td>
                            </tr>

                            <tr className="border-t border-gray-300">
                              <td className="border border-gray-300 p-2">
                                Total Earning
                              </td>
                              <td className="border border-gray-300 p-2">
                                {total}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-span-4 mt-4">
                        <span className="font-bold">Net Pay: {total}</span>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <div className="flex flex-col">
                        <span className="font-bold">For Company</span>
                        <span className="mt-4">Authorised Signatory</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewPayslip;
