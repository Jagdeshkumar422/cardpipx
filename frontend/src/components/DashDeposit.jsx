import React, { useEffect, useState } from "react";
import backend_URL from "../config";
import axios from "axios";
import { MdCancel } from "react-icons/md";
const DashDeposit = () => {

  const [depositData, setDepositData] = useState([])
  const [loading, setLoading] = useState(false);
  const [selectedImage, setselectedImage] = useState(null);
  const [imageModel, setImageModel] = useState(false);

  useEffect(() => {
    const getDeposit = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${backend_URL}/transaction/depositTransactions`)
        setDepositData(response.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    getDeposit()
  }, [])

  const handleImageModel = (imageSource) => {
    setImageModel(true)
    setselectedImage(imageSource)
  }


  return <div className="md:mx-auto py-6 bg-white rounded-lg table-auto overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
    {
      loading ? (<div className="loader" style={{ width: "30px" }}></div>)
        : depositData.length === 0 ? (
          <p className="mx-auto text-center">No any credit request available.</p>)
          : (
            <div>
              <table className="w-full min-w-max border border-gray-300">
                <thead>
                  <tr className="bg-[#0FBB4F] text-white">
                    <th className="p-3 border text-sm md:text-[15px]">Date & Time</th>
                    <th className="p-3 border text-sm md:text-[15px]">By</th>
                    <th className="p-3 border text-sm md:text-[15px]">Email</th>
                    <th className="p-3 border text-sm md:text-[15px]">Token ID</th>
                    <th className="p-3 border text-sm md:text-[15px]">Secret Code</th>
                    <th className="p-3 border text-sm md:text-[15px]">Wallet ID</th>
                    <th className="p-3 border text-sm md:text-[15px]">Amount</th>
                    <th className="p-3 border text-sm md:text-[15px]">Screenshot</th>
                    <th className="p-3 border text-sm md:text-[15px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    depositData.map((data, index) => (
                      <tr key={index} className="hover:bg-gray-100 text-gray-700">
                        <td className="p-3 border">{new Date(data.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} | {new Date(data.createdAt).toLocaleTimeString()}</td>
                        <td className="p-3 border">{data.userId.name}</td>
                        <td className="p-3 border">{data.userId.email}</td>
                        <td className="p-3 border">{data.tokenId}</td>
                        <td className="p-3 border">{data.secretCode}</td>
                        <td className="p-3 border">{data.walletId}</td>
                        <td className="p-3 border">{data.amount}</td>
                        <td className="p-3 border cursor-pointer"><img src={data.screenshot} className="w-8 h-8 object-cover" draggable="false" onClick={() => handleImageModel(data.screenshot)} /></td>
                        {data.status === "pending" && <td className="p-3 border text-yellow-600">Pending</td>}
                        {data.status === "rejected" && <td className="p-3 border text-red-600">Rejected</td>}
                        {data.status === "accepted" && <td className="p-3 border text-green-600">Accepted</td>}
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )}
    {imageModel && <div className="fixed top-0 left-0 h-screen w-full" style={{ background: "rgba(0, 0, 0, 0.6)" }}>
      <div className="absolute md:top-10 md:right-10 top-2 right-2 z-50 text-4xl cursor-pointer" onClick={() => setImageModel(false)}>
        <MdCancel className="text-white bg-black rounded-full" />
      </div>
      <div className="mx-auto mt-10">
        <img src={selectedImage} alt="" className="w-full h-[90vh] object-contain" draggable="false" />
      </div>
    </div>
    }
  </div>;
};

export default DashDeposit;
