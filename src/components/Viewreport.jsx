
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { ToWords } from 'to-words';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { HiOutlineDocumentDownload } from "react-icons/hi";



const Viewreport = () => {
    const {user} = useAuthContext()
    const [employee, setEmployee] = useState();
    
    
        
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
  
  

    
      
      const handlePdf = ()=>{
        const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0,);
        pdf.save("download.pdf");
      })
      }
  return (
    <div className="p-5 md:p-28 mt-20 md:mt-0 text-black ">
        <div className="flex font-semibold items-center text-white/60">
            <p className="text-white/60">Download</p>
            <HiOutlineDocumentDownload onClick={handlePdf} size={25}/>
        </div>

      <div id="divToPrint" className=" w-full  my-5 bg-white p-5 md:p-28">
        <div className="text-center mb-2 leading-none">
          <h6 className="font-bold">Report</h6>
          <span className="font-normal ">
            report for the month of June 2021
          </span>
        </div>

        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-10">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-bold">Company Code :</span>
                <small className="ml-3"></small>
              </div>
              <div>
                <span className="font-bold">Company Name :</span>
                <small className="ml-3"></small>
              </div>
              <div>
                <span className="font-bold">tel No.</span>
                <small className="ml-3">101523065714</small>
              </div>
              
              <div>
                <span className="font-bold">Designation</span>
                <small className="ml-3">Marketing Staff (MK)</small>
              </div>
              
            </div>
            <table className="mt-4 w-full border-collapse border border-gray-300">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border border-gray-300 p-2">Employees</th>
                  <th className="border border-gray-300 p-2">Job Role</th>
                  
                  
                </tr>
              </thead>
              <tbody>
                {
                    employee && employee.map((item)=>(
                        <tr>
                  <td className="border border-gray-300 p-2">{item.name}</td>
                  <td className="border border-gray-300 p-2">{item.jobrole}</td>
                  
                  
                </tr>
                    ))
                }
                
              </tbody>
            </table>
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
  );
};

export default Viewreport;
