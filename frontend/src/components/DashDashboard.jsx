import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import backend_URL from "../config";
import { PiHandDepositFill } from "react-icons/pi";
import { FaCreditCard } from "react-icons/fa6";
import { MdSmsFailed } from "react-icons/md";
import { GiHourglass } from "react-icons/gi";
import { Link } from "react-router-dom";

const DashDashboard = () => {

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalRejected, setTotalRejected] = useState(0);
  const [totalPending, setTotalPending] = useState(0);




  const [loading, setLoading] = useState(false);


  useEffect(() => {

    const getTotalUsers = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${backend_URL}/auth/getAllUsers`)
        setTotalUsers(response.data.length)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    const getTotalDeposit = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${backend_URL}/transaction/depositTransactions`)
        setTotalDeposit(response.data.length)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }

    const getTotalCredit = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${backend_URL}/transaction/creditTransactions`)
        setTotalCredit(response.data.length)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }

    const totalRejected = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${backend_URL}/transaction/rejectedTransactions`)
        setTotalRejected(response.data.length)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    const totalPending = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${backend_URL}/transaction/pendingTransactions`)
        setTotalPending(data.length)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    getTotalUsers()
    getTotalDeposit()
    getTotalCredit()
    totalRejected()
    totalPending()
  }, [])


  return <div className="p-3 md:mx-auto">
    <div className="flex flex-wrap gap-4 justify-center">
      {/* --------- */}
      <Link to="/adminDash?tab=users" className="flex flex-col p-3 bg-[#F3F4F6] gap-4 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
          <div className="">
            <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
            {loading ? <div className="loader"></div> : <p className="text-2xl">{totalUsers}</p>}
          </div>
          <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
      </Link>
      {/* ------------ */}
      <Link to="/adminDash?tab=deposit" className="flex flex-col p-3 bg-[#F3F4F6] gap-4 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
          <div className="">
            <h3 className="text-gray-500 text-md uppercase">Deposit</h3>
            {loading ? <div className="loader"></div> : <p className="text-2xl">{totalDeposit}</p>}
          </div>
          <PiHandDepositFill className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
      </Link>
      {/* ------------ */}
      <Link to="/adminDash?tab=credit" className="flex flex-col p-3 bg-[#F3F4F6] gap-4 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
          <div className="">
            <h3 className="text-gray-500 text-md uppercase">Credit</h3>
            {loading ? <div className="loader"></div> : <p className="text-2xl">{totalCredit}</p>}
          </div>
          <FaCreditCard className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
      </Link>
      {/* ------------ */}
      <Link to="/adminDash?tab=rejected" className="flex flex-col p-3 bg-[#F3F4F6] gap-4 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
          <div className="">
            <h3 className="text-gray-500 text-md uppercase">Rejected</h3>
            {loading ? <div className="loader"></div> : <p className="text-2xl">{totalRejected}</p>}
          </div>
          <MdSmsFailed className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
      </Link>
      {/* ------------ */}
      <Link to="/adminDash?tab=pending" className="flex flex-col p-3 bg-[#F3F4F6] gap-4 md:w-72 w-full rounded-md shadow-md">
        <div className="flex justify-between">
          <div className="">
            <h3 className="text-gray-500 text-md uppercase">Pending</h3>
            {loading ? <div className="loader"></div> : <p className="text-2xl">{totalPending}</p>}
          </div>
          <GiHourglass className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
      </Link>
    </div>
  </div>
};

export default DashDashboard;
