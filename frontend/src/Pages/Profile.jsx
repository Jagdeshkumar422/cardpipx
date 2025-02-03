import React, { useEffect, useState } from "react";
import ProfileNavbar from "../components/ProfileNavbar";
import { useSelector } from "react-redux";
import backend_URL from "../config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteUserSuccess } from "../Redux/User/UserSlice";

const DepositToken = () => {
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()



    //! PERSONAL INFORMATION LOGICS ---------------------------------------------------------------------------
    const [formData, setFormData] = useState({});
    const [initialData, setInitialData] = useState({});
    const [infoSuccessMessage, setInfoSuccessMessage] = useState(null);
    const [infoErrorMessage, setInfoErrorMessage] = useState(null);
    const [infoLoading, setInfoLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };



    const handleInfoSubmit = async (e) => {
        e.preventDefault();
        setInfoErrorMessage(null)
        setInfoSuccessMessage(null)
        setInfoLoading(false)

        // Compare formData with initialData to find changed fields
        const updatedFields = {};
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== initialData[key]) {
                updatedFields[key] = formData[key];
            }
        });

        // Prevent submission if no changes were made
        if (Object.keys(updatedFields).length === 0) {
            setInfoErrorMessage("No changes made.");
            return;
        }

        try {
            setInfoLoading(true)
            const response = await axios.put(`${backend_URL}/auth/updatePersonalInfo/${currentUser._id}`, updatedFields, {
                withCredentials: true,
            })
            if (response.status === 200) {
                setInfoLoading(false)
                setInfoSuccessMessage(response.data.message);
                setInfoErrorMessage(null)
                setInitialData({ ...formData }); // Update initial data to reflect saved state
            }
        } catch (error) {
            setInfoLoading(false)
            setInfoSuccessMessage(null)
            setInfoErrorMessage(error.response?.data?.message || "Faild to update.")
        }
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${backend_URL}/auth/getUser/${currentUser._id}`, {
                    withCredentials: true,
                })
                setFormData(response.data)
                setInitialData(response.data);
            } catch (error) {
                console.log("Fetching error in getUserData:", error);
            }
        }
        getUser()
    }, [currentUser])


    //! PASSWORD FORM LOGICS ---------------------------------------------------------------------------


    const [PasswordSuccessMessage, setPasswordSuccessMessage] = useState(null);
    const [PasswordErrorMessage, setPasswordErrorMessage] = useState(null);
    const [PasswordLoading, setPasswordLoading] = useState(false);
    const [passwordFormData, setPasswordFormData] = useState({});


    const handlePasswordChange = (e) => {
        const { id, value } = e.target
        setPasswordFormData({ ...passwordFormData, [id]: value })
    }

    const handlePasswordsubmit = async (e) => {
        e.preventDefault()
        setPasswordErrorMessage(null);
        setPasswordSuccessMessage(null);
        setPasswordLoading(false);

        const newPassword = passwordFormData.newPassword;
        const confirmPassword = passwordFormData.confirmPassword;

        if (!newPassword || !confirmPassword) {
            setPasswordErrorMessage("Both password fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordErrorMessage("Password do not match");
            return;
        }

        try {
            setPasswordLoading(true);
            const response = await axios.put(`${backend_URL}/auth/updatePassword/${currentUser._id}`, {
                currentPassword: passwordFormData.currentPassword,
                newPassword: newPassword,
            }, {
                withCredentials: true,
            });

            if (response.status === 200) {
                setPasswordLoading(false);
                setPasswordSuccessMessage("Password updated successfully!");
                setPasswordErrorMessage(null);
            }
        } catch (error) {
            setPasswordLoading(false);
            setPasswordErrorMessage(error.response?.data?.message || "Failed to update password.");
        }
    }

    //! DELETE ACCOUNT LOGICS ---------------------------------------------------------------------------

    const [deleteModel, setDeleteModel] = useState(false);
    const [deleteAccountPassword, setDeleteAccountPassword] = useState("");
    const [passwordModelError, setPasswordModelError] = useState(null);

    const handleCancelClick = () => {
        setDeleteModel(false);
        setDeleteAccountPassword("");
        setPasswordModelError(null)
    }

    const handleDeleteAccount = async (e) => {
        e.preventDefault()
        setPasswordModelError(null)
        if (!deleteAccountPassword) {
            return setPasswordModelError("Password is required.")
        }
        try {
            const response = await axios.delete(`${backend_URL}/auth/deleteUser/${currentUser._id}/${deleteAccountPassword}`, {
                withCredentials: true,
            })
            setPasswordModelError(null)
            setTimeout(() => {
                dispatch(deleteUserSuccess())
                window.location.href = "/"
            }, 1000);
        } catch (error) {
            setPasswordModelError(error.response?.data?.message)
        }
    }

    return (
        <div className="bg-[#f3f4f6]">
            <ProfileNavbar />
            {/* <div>
                <h1 className="md:pl-[7.4rem] font-semibold text-xl py-4 border-b-1 border-gray-300">Profile</h1>
            </div> */}
            <div className="flex items-center justify-center md:px-12 py-6">
                <form onSubmit={handleInfoSubmit} className="depositForm bg-white p-6 md:p-12 rounded-lg shadow-2xl flex flex-col justify-center gap-5">
                    <div>
                        <h1 className="font-semibold text-xl">Profile Information</h1>
                        <p className="text-sm mt-2 text-gray-700">Update your account's profile information and email address.</p>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                        <label className="font-semibold text-gray-700">Name</label>
                        <input type="text" id="name" required placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full py-1 px-2 rounded-md text-gray-700 border border-gray-300 focus:outline-blue-600" />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                        <label className="font-semibold text-gray-700">Email</label>
                        <input type="email" id="email" required placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full py-1 px-2 rounded-md text-gray-700 border border-gray-300 focus:outline-blue-600" />
                    </div>
                    <button type="submit" className="w-full bg-[#22c55ee8] hover:bg-[#22C55E] text-white rounded-md py-2 px-3 font-semibold cursor-pointer">
                        {infoLoading ? "Saving ..." : " SAVE"}
                    </button>
                    {infoErrorMessage && <div className="text-red-600 mt-3 bg-red-100 p-2 rounded-md text-center">{infoErrorMessage}</div>}
                    {infoSuccessMessage && <div className="text-green-600 mt-3 bg-green-100 p-2 rounded-md text-center">{infoSuccessMessage}</div>}
                </form>
            </div>
            <div className="flex items-center justify-center md:px-12 py-12">
                <form onSubmit={handlePasswordsubmit} className="depositForm bg-white p-6 md:p-12 rounded-lg shadow-2xl flex flex-col justify-center">
                    <div>
                        <h1 className="font-semibold text-xl">Update Password</h1>
                        <p className="text-sm mt-2 mb-4 text-gray-700">Ensure your account is using a long, random password to stay secure.</p>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <label className="font-semibold text-gray-700">Current Password</label>
                        <input type="password" id="currentPassword" required value={passwordFormData.currentPassword || ""} onChange={handlePasswordChange} className="w-full p-1 rounded-md mb-2 border border-gray-300 focus:outline-blue-600" />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <label className="font-semibold text-gray-700">New Password</label>
                        <input type="password" id="newPassword" required value={passwordFormData.newPassword || ""} onChange={handlePasswordChange} className="w-full focus:outline-blue-600 border border-gray-300 p-1 rounded-md mb-2" />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <label className="font-semibold text-gray-700">Confirm Password</label>
                        <input type="password" id="confirmPassword" required value={passwordFormData.confirmPassword || ""} onChange={handlePasswordChange} className="w-full border border-gray-300 p-1 rounded-md mb-4 focus:outline-blue-600" />
                    </div>
                    <button type="submit" className="w-full bg-[#22c55ee8] hover:bg-[#22C55E] text-white rounded-md py-2 px-3 font-semibold cursor-pointer">
                        {PasswordLoading ? "Saving ..." : "SAVE"}
                    </button>
                    {PasswordErrorMessage && <div className="text-red-600 mt-3 bg-red-100 p-2 rounded-md text-center">{PasswordErrorMessage}</div>}
                    {PasswordSuccessMessage && <div className="text-green-600 mt-3 bg-green-100 p-2 rounded-md text-center">{PasswordSuccessMessage}</div>}
                </form>
            </div>
            <div className="flex items-center justify-center md:px-12 py-12">
                <div className="depositForm bg-white p-6 md:p-12 rounded-lg shadow-2xl flex flex-col justify-center">
                    <div>
                        <h1 className="font-semibold text-xl">Delete Account</h1>
                        <p className="text-sm mt-2 mb-4 text-gray-700">Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.</p>
                    </div>
                    <button onClick={() => { setDeleteModel(true) }} className="w-full bg-red-700 hover:bg-red-600 text-white rounded-md py-2 px-3 font-semibold">
                        DELETE ACCOUNT
                    </button>
                </div>
            </div>
            {deleteModel && <div className="fixed top-0 w-full bg-amber-100 h-screen z-[2000] flex items-center justify-center px-4 text-left">
                <div className="max-w-xl z-[3000] flex flex-col justify-center gap-3">
                    <h1 className="text-black font-semibold text-xl">Are you sure you want to delete your account?</h1>
                    <p className="text-gray-800 text-sm">Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.</p>
                    <form onSubmit={handleDeleteAccount}>
                        <div>
                            <input type="password" id="userPassword" placeholder="Password" value={deleteAccountPassword} onChange={(e) => setDeleteAccountPassword(e.target.value)} className="w-full border border-gray-300 py-1 px-2 rounded-md focus:outline-blue-800" />
                            {passwordModelError && <p className="mt-1 text-red-600 font-semibold">{passwordModelError}</p>}
                        </div>
                        <div className="flex items-end justify-end gap-4 mt-4">
                            <button onClick={handleCancelClick} className="bg-white text-black px-4 py-2 rounded-md font-semibold cursor-pointer hover:bg-gray-200 transition-all duration-200">CANCEL</button>
                            <button type="submit" className="bg-red-100 text-red-600 px-4 py-2 rounded-md font-semibold cursor-pointer hover:bg-red-200 transition-all duration-200">DELETE ACCOUNT</button>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    );
};

export default DepositToken;
