import React, { useEffect, useState } from "react";
import logo from "../assets/Logo.png"
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation } from 'react-router'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signoutsuccess } from "../Redux/User/UserSlice.js"
import { useNavigate } from "react-router-dom";
import backend_URL from "../config.js"
import axios from "axios"
const AdminNavbar = () => {
    const location = useLocation()
    const [isMobile, setIsMobile] = useState(false);
    const [profileModal, setProfileModal] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);



    const handleLogOut = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signout")
            if (response.status === 200) {
                dispatch(signoutsuccess());
                navigate("/")
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const [userName, setUserSame] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${backend_URL}/auth/getUser/${currentUser._id}`)
                if (response) {
                    setUserSame(response.data.name)
                    setUserEmail(response.data.email)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [currentUser])

    return (
        <div>
            <div className="pcDashNav md:flex items-center justify-between w-full px-[2rem] md:px-[7rem] h-[80px] hidden bg-[#f3f4f6]">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-1"><img src={logo} alt="" className="w-[40] h-[40px]" /><h1 className="font-bold text-xl">CardpipX</h1></Link>
                    <Link to="/adminDash?tab=dash" className={`font-semibold text-sm  cursor-pointer ${location.pathname === "/adminDash" && "border-b-1 border-indigo-500 py-3"}`}>Dashboard</Link>
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm hover:text-black cursor-pointer" onClick={() => setProfileModal(!profileModal)}><p>{userName || currentUser.name}</p> <IoIosArrowDown /></div>
            </div>
            {profileModal && <div className="relative">
                <div className=" bg-white rounded-lg shadow-2xl w-[12rem] text-left h-[5rem] absolute -top-2 right-[7%] flex flex-col items-start justify-center gap-1 text-sm">
                    <div className="w-full cursor-pointer hover:bg-[#f3f4f6] p-1 pl-4"><Link to="/adminProfile">Profile</Link></div>
                    <button className="w-full cursor-pointer text-left hover:bg-[#f3f4f6] p-1 pl-4" onClick={handleLogOut}>Log Out</button>
                </div>
            </div>}
            <div className="mobileDashNav md:hidden">
                <div className="flex items-center justify-between px-[1.5rem]">
                    <Link to="/" className="flex items-center gap-1 h-[50px]">
                        <img src={logo} alt="" className="w-[35] h-[35px]" />
                        <h1 className="font-bold text-xl">CardpipX</h1>
                    </Link>
                    <div>{isMobile ? <IoMdClose className="text-xl text-gray-700" onClick={() => setIsMobile(!isMobile)} /> : <RxHamburgerMenu className="text-xl text-gray-700" onClick={() => setIsMobile(!isMobile)} />}</div>
                </div>
                {isMobile && <div className="relative z-[500] bg-[#f3f4f6] w-[100%] h-[30vh]">
                    <div className="absolute z-[1000] top-0 flex flex-col justify-center items-start mt-4 w-full bg-[#f3f4f672] py-1">
                        <Link to="/adminDash?tab=dash" className="w-full font-semibold pl-4 py-2 text-sm">Dashboard</Link>
                        <hr className="h-1 w-full mt-3 text-gray-200" />
                        <div className="flex flex-col items-start justify-center pl-4 text-sm py-4">
                            <p className="font-semibold">{userName || currentUser.name}</p>
                            <p className="font-semibold text-gray-500">{userEmail || currentUser.email}</p>
                        </div>
                        <div className={`w-full pl-4 text-sm text-gray-500 font-semibold mb-4 cursor-pointer ${location.pathname === "/adminProfile" && "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-500 py-2"}`}><Link to="/adminProfile">Profile</Link></div>
                        <button className="w-full text-left pl-4 text-sm text-gray-500 font-semibold cursor-pointer pb-1" onClick={handleLogOut}>Log Out</button>
                    </div>
                </div>}
            </div>
        </div>
    )
};

export default AdminNavbar;
