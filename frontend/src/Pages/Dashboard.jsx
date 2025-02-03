import React, { useEffect, useState } from "react";
import DashNavbar from "../components/DashNavbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Transactions from "../components/Transactions";
import axios from "axios";
import backend_URL from "../config";

const Dashboard = () => {

    const { currentUser } = useSelector((state) => state.user)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalBalance, setTotalBalance] = useState(0);


    useEffect(() => {
        const getAllTransactions = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${backend_URL}/transaction/getTransactions/${currentUser._id}`, { withCredentials: true })
                setData(response.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        }
        const getUser = async () => {
            try {
                const response = await axios.get(`${backend_URL}/auth/getUserBalance/${currentUser._id}`, { withCredentials: true })
                setTotalBalance(response.data.totalBalance)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
        getAllTransactions()
    }, [currentUser])

    return <div className="w-full h-screen relative">
        <div className="w-full"><DashNavbar />
            {/* <div>
                <h1 className="md:pl-[7.4rem] font-semibold text-xl py-4 border-b-1 border-gray-300">Welcome {currentUser.name} 🎉</h1>
            </div> */}
        </div>
        <div className="flex flex-col items-center">
            <div className="absolute md:top-[22%] top-[13%] bg-gradient-to-r from-[#A2E635] to-[#4BDF80] w-full max-w-3xl h-[9rem] md:h-[13rem] rounded-lg mt-10"></div>
            <div className="absolute md:top-[48%] top-[25%] flex flex-col items-start justify-center bg-white w-full max-w-sm rounded-md h-[7rem] pl-10">
                <p className="font-semibold text-sm">Total balance</p>
                <p >GHS <span className="text-[#36c668] font-semibold text-2xl">{totalBalance}.00</span></p>
            </div>
            <div className="absolute md:top-[70%] top-[44%] flex items-center justify-center gap-16 md:gap-30">
                <Link to="/deposit" className="w-full bg-[#FB923C] text-white rounded-md py-3 px-6 font-semibold">DepositToken</Link>
                <Link to="/withdraw" className="w-full bg-[#22C55E] text-white rounded-md py-3 px-6 font-semibold">Withdraw</Link>
            </div>
            <div className="w-full  max-w-3xl absolute top-[90%] flex flex-col justify-center items-center bg-[#efecec4d] rounded-t-xl p-6 text-sm font-semibold">
                <div className="w-full flex justify-between">
                    <p className="text-gray-500">Recent Transactions</p>
                    <p className="text-[#22C55E]">See All</p>
                </div>
                {loading ? (
                    <p className="text-gray-500 text-center my-8">Fetching Transactions ...</p>
                ) : data.length === 0 ? (<p className="text-gray-500 text-center my-8">No transactions available.</p>)
                    :
                    (
                        data.map((item, idx) => (
                            <Transactions key={idx} item={item} />
                        ))
                    )}
            </div>
        </div>
    </div>;
};

export default Dashboard;
