import React, { useEffect, useState } from "react";
import backend_URL from "../config";
import axios from "axios";
const DashCredit = () => {

  const [creditData, setCreditData] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCredit = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${backend_URL}/transaction/creditTransactions`)
        setCreditData(response.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    getCredit()
  }, [])


  return <div className="md:mx-auto py-6 bg-white rounded-lg table-auto overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
    {
      loading ? (<div className="loader" style={{ width: "30px" }}></div>)
        : creditData.length === 0 ? (
          <p className="mx-auto text-center">No any credit request available.</p>)
          : (
            <div>
              <table className="w-full min-w-max border border-gray-300">
                <thead>
                  <tr className="bg-[#0FBB4F] text-white">
                    <th className="p-3 border text-sm md:text-[15px]">Date & Time</th>
                    <th className="p-3 border text-sm md:text-[15px]">By</th>
                    <th className="p-3 border text-sm md:text-[15px]">Email</th>
                    <th className="p-3 border text-sm md:text-[15px]">account Name</th>
                    <th className="p-3 border text-sm md:text-[15px]">Agent Services</th>
                    <th className="p-3 border text-sm md:text-[15px]">Network Provider</th>
                    <th className="p-3 border text-sm md:text-[15px]">Account Number</th>
                    <th className="p-3 border text-sm md:text-[15px]">Withdrawal Amount</th>
                    <th className="p-3 border text-sm md:text-[15px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    creditData.map((data, index) => (
                      <tr key={index} className="hover:bg-gray-100 text-gray-700">
                        <td className="p-3 border">{new Date(data.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} | {new Date(data.createdAt).toLocaleTimeString()}</td>
                        <td className="p-3 border">{data.userId.name}</td>
                        <td className="p-3 border">{data.userId.email}</td>
                        <td className="p-3 border">{data.accountName}</td>
                        <td className="p-3 border">{data.agentService}</td>
                        <td className="p-3 border">{data.networkProvider}</td>
                        <td className="p-3 border">{data.accountNumber}</td>
                        <td className="p-3 border">{data.withdrawalAmount}</td>
                        {data.status === "pending" && <td className="p-3 border text-yellow-600">Pending</td>}
                        {data.status === "rejected" && <td className="p-3 border text-red-600">Rejected</td>}
                        {data.status === "accepted" && <td className="p-3 border text-green-600">Accepted</td>}

                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>)}
  </div>;
};

export default DashCredit;
