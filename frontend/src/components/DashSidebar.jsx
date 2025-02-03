import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { HiChartPie } from "react-icons/hi"
import { FaUser } from "react-icons/fa";
import { PiHandDepositFill } from "react-icons/pi";
import { FaCreditCard } from "react-icons/fa6";
import { MdSmsFailed } from "react-icons/md";
import { GiHourglass } from "react-icons/gi";

const DashSidebar = () => {
    const location = useLocation();
    const [tab, setTab] = useState("");

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return <div className="w-full md:w-64 bg-white shadow-lg mx-auto rounded-xl py-6">
        <ul>
            <Link to="/adminDash?tab=pending" className={`${location.pathname === "/adminDash" &&
                location.search === "?tab=pending"
                ? "text-white bg-[#0FBB4F] font-bold"
                : null
                } flex items-center gap-3 px-8 py-3 text-gray-600 mb-2 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#0FBB4F] transition-all duration-300`}
            >
                <GiHourglass />
                <p>Pending</p>
            </Link>
            <Link to="/adminDash?tab=dash" className={`${location.pathname === "/adminDash" &&
                location.search === "?tab=dash"
                ? "text-white bg-[#0FBB4F] font-bold"
                : null
                } flex items-center gap-3 px-8 py-3 text-gray-600 mb-2 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#0FBB4F] transition-all duration-300`}
            >
                <HiChartPie />
                <p>Dashboard</p>
            </Link>
            <Link to="/adminDash?tab=users" className={`${location.pathname === "/adminDash" &&
                location.search === "?tab=users"
                ? "text-white bg-[#0FBB4F] font-bold"
                : null
                } flex items-center gap-3 px-8 py-3 text-gray-600 mb-2 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#0FBB4F] transition-all duration-300`}
            >
                <FaUser />
                <p>Users</p>
            </Link>
            <Link to="/adminDash?tab=deposit" className={`${location.pathname === "/adminDash" &&
                location.search === "?tab=deposit"
                ? "text-white bg-[#0FBB4F] font-bold"
                : null
                } flex items-center gap-3 px-8 py-3 text-gray-600 mb-2 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#0FBB4F] transition-all duration-300`}
            >
                <PiHandDepositFill />
                <p>Deposit</p>
            </Link>
            <Link to="/adminDash?tab=credit" className={`${location.pathname === "/adminDash" &&
                location.search === "?tab=credit"
                ? "text-white bg-[#0FBB4F] font-bold"
                : null
                } flex items-center gap-3 px-8 py-3 text-gray-600 mb-2 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#0FBB4F] transition-all duration-300`}
            >
                <FaCreditCard />
                <p>Credit</p>
            </Link>
            <Link to="/adminDash?tab=rejected" className={`${location.pathname === "/adminDash" &&
                location.search === "?tab=rejected"
                ? "text-white bg-[#0FBB4F] font-bold"
                : null
                } flex items-center gap-3 px-8 py-3 text-gray-600 mb-2 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#0FBB4F] transition-all duration-300`}
            >
                <MdSmsFailed />
                <p>Rejected</p>
            </Link>
        </ul>
    </div>;
};

export default DashSidebar;
