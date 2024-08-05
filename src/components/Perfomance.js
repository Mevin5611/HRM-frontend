import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCollapseContext } from "../hooks/useCollapseContext";

const Perfomance = () => {
  const { user } = useAuthContext();
  const [performance, setPerformance] = useState();
  

  useEffect(() => {
    setPerformance(user.user.performance);
  }, [user]);

  const data = [];
  performance &&
    performance.map((item) => {
      data.push({
        name: new Date(item.date).toLocaleDateString("en-En", {
          month: "long",
        }),
        per: 100,
        Perfomance: item.percentage,
      });
    });

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%"
        height={250}
        
        
        >
          
      <LineChart 
        
        data={data}
        margin={{ top: 5, bottom: 5 }}
        className="ms-[-60px] w-[600px] md:w-[730px]"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" className="font-semibold text-black" />
        <YAxis dataKey="per" className="font-semibold text-black" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Perfomance" stroke="#82ca9d" />
      </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Perfomance;
