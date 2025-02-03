import React, { useState } from "react";
import ProfileNavbar from "./ProfileNavbar";
import axios from "axios";
import backend_URL from "../config";
import { useSelector } from "react-redux";

const WithdrawPage = () => {
  const [formData, setFormData] = useState({
    accountName: "",
    agentService: "not_selected_agent",
    networkProvider: "not_selected_network_provider",
    accountNumber: "",
    withdrawalAmount: "",
  });

  const { currentUser } = useSelector((state) => state.user)

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleFormSubmit = async (e) => {
    setErrorMessage(null)
    setSuccessMessage(null)
    setLoading(false)
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(`${backend_URL}/transaction/credit/${currentUser._id}`, formData,
        { withCredentials: true })
      setErrorMessage(null)
      setSuccessMessage(response.data.message || "Credit transaction request submitted successfully.")
      setLoading(false)
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1000);
    } catch (error) {
      setSuccessMessage(null)
      setLoading(false)
      setErrorMessage(error.response?.data?.message || "Some error occurred.")
      console.log(error)
    }
  };

  return (
    <div className="h-screen bg-[#f3f4f6]">
      <ProfileNavbar />
      <div className="h-[85vh] flex items-center justify-center">
        <form onSubmit={handleFormSubmit} className="depositForm bg-white p-6 md:p-12 rounded-lg shadow-2xl flex flex-col justify-center gap-5">
          <div className="flex flex-col justify-center gap-1">
            <label className="font-semibold text-sm text-gray-800">Account Name</label>
            <input
              type="text"
              name="accountName"
              placeholder="Enter Account Name"
              value={formData.accountName}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-blue-600"
            />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <label className="font-semibold text-sm text-gray-800">Agent Services</label>
            <select
              name="agentService"
              value={formData.agentService}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-blue-600"
            >
              <option value="not_selected_agent" disabled>Select an agent service</option>
              <option value="KOWRI OVA">KOWRI OVA</option>
              <option value="EXPRESS OVA">EXPRESS OVA</option>
            </select>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <label className="font-semibold text-sm text-gray-800">Network Provider</label>
            <select
              name="networkProvider"
              value={formData.networkProvider}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-blue-600"
            >
              <option value="not_selected_network_provider" disabled>Select a network provider</option>
              <option value="MTN">MTN</option>
              <option value="Telecel">Telecel</option>
              <option value="AirtelTigo">AirtelTigo</option>
            </select>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <label className="font-semibold text-sm text-gray-800">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              placeholder="Enter Account Number"
              value={formData.accountNumber}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-blue-600"
            />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <label className="font-semibold text-sm text-gray-800">Withdrawal Amount</label>
            <input
              type="number"
              name="withdrawalAmount"
              placeholder="Enter Amount (min 3000)"
              value={formData.withdrawalAmount}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-blue-600"
            />
          </div>
          <button type="submit" className="w-full bg-[#22c55ee8] hover:bg-[#22C55E] text-white rounded-md py-2 px-3 font-semibold">
            {loading ? "Sending..." : "Confirm"}
          </button>
          {errorMessage && <div className="text-red-600 mt-3 bg-red-100 p-2 rounded-md text-center">{errorMessage}</div>}
          {successMessage && <div className="text-green-600 mt-3 bg-green-100 p-2 rounded-md text-center">{successMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default WithdrawPage;