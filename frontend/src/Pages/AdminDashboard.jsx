import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashUsers from "../components/DashUsers";
import DashDashboard from "../components/DashDashboard";
import DashDeposit from "../components/DashDeposit";
import DashCredit from "../components/DashCredit";
import DashRejected from "../components/DashRejected";
import DashApprove from "../components/DashPending";

const AdminDashboard = () => {

  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }

  }, [location.search]);

  return <div>
    <AdminNavbar />
    <div className=" flex flex-col md:flex-row gap-2">
      <div className="md:w-64"><DashSidebar /></div>

      {/* to approve */}
      {tab === "pending" && <DashApprove />}

      {/* Dashboard */}
      {tab === "dash" && <DashDashboard />}

      {/* users */}
      {tab === "users" && <DashUsers />}

      {/* Deposit */}
      {tab === "deposit" && <DashDeposit />}

      {/* Credit */}
      {tab === "credit" && <DashCredit />}

      {/* Rejected */}
      {tab === "rejected" && <DashRejected />}

    </div>

  </div>;
};

export default AdminDashboard;
