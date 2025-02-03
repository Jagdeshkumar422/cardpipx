import React from "react";
import logo from "../assets/Logo.png"
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
    return <div className="">
        <div className="flex items-center justify-around bg-[#e5e7eb22] pt-[2rem] pb-[2rem]">
            <a href="#home" className="flex justify-center items-center gap-3 cursor-pointer">
                <img src={logo} alt="logo" className="w-[50px] h-[50px]" />
                <p className="font-bold text-2xl">CardpipX</p>
            </a>
            <div className="flex items-center justify-center gap-2 ">
                <FaFacebook className="text-xl text-[#47c02f]" />
                <FaTwitter className="text-xl text-[#47c02f]" />
                <FaInstagram className="text-xl text-[#47c02f]" />
            </div>
        </div>
        <div className="bg-[#E5E7EB] text-black text-center pt-[0.5rem] pb-[0.5rem]">
            © 2025 CardpipX. All Rights Reserved.
        </div>
    </div>;
};

export default Footer;
