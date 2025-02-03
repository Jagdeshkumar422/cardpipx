import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTrash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import backend_URL from "../config";

const DashUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${backend_URL}/auth/getAllUsers`);
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle user deletion
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${backend_URL}/auth/deleteByAdmin/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        console.log("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="md:mx-auto py-6 bg-white rounded-lg table-auto overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
      {loading ? (
        <div className="loader" style={{ width: "30px" }}>
        </div>
      ) : (
        <div>
          <table className="w-full min-w-max border border-gray-300">
            <thead>
              <tr className="bg-[#0FBB4F] text-white">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Username</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Admin</th>
                <th className="p-3 border">Balance</th>
                <th className="p-3 border">Created At</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100 text-gray-700">
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.username}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border text-center">
                    {user.isAdmin ? <FaCheck className="text-blue-500" /> : <RxCross2 className="text-red-500" />}
                  </td>
                  <td className="p-3 border font-semibold">{user.totalBalance.toLocaleString()}</td>
                  <td className="p-3 border">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashUsers;
