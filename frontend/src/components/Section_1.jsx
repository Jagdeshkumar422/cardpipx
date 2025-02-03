import React from "react";
import banner1 from "../assets/banner_1.png"
import banner2 from "../assets/banner_2.png"
import POS from "../assets/POS.png"
import QRcode from "../assets/QRcode.png"
import { Link } from "react-router-dom";
const Section_1 = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-30 md:mt-[10rem] w-full">
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20">
                <img src={banner1} alt="" className="h-[350px] w-[350] md:h-[400px] md:w-[400px] rounded-md object-cover" draggable="false" />
                <div className="text-center md:text-left px-2 md:px-0">
                    <h1 className="text-black text-2xl md:text-5xl font-semibold mb-3">Big Rewards Awaits You!</h1>
                    <div className="max-w-[30rem]">
                        <span className="text-[#72BE20] font-bold tracking-wider"><i>DOUBLE YOUR SMALL TOKEN </i></span>
                        <span className="tracking-wide text-lg">with huge rewards, exclusive bonuses, and opportunities to grow like never before!</span>
                    </div>
                    <div><i className="tracking-wide text-gray-600 font-semibold">Ready to make your move?</i></div>
                    <Link to="/register" className="">
                        <button className="mt-6 px-6 py-3 bg-gradient-to-r from-[#9EE537] to-[#25C65D] text-white font-bold rounded-md cursor-pointer">Sign Up</button></Link>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 md:gap-10 lg:gap-20 mt-30">
                <div className="text-center md:text-left px-2 md:px-0">
                    <h1 className="text-2xl md:text-5xl font-semibold tracking-wide">Secure Platform</h1>
                    <p className="text-lg font-normal text-gray-800 max-w-[30rem]">Licensed by the Bank of Ghana and PCI DSS certified, your business is assured of the safety of each transaction made via CardpipX.</p>
                </div>
                <img src={banner2} alt="" className="h-[300px] w-[300] md:h-[400px] md:w-[400px] rounded-md object-cover" />
            </div>

            <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-10 md:gap-20 lg:gap-30 mt-30">

                <div className="flex flex-wrap text-center md:text-left gap-10 justify-center items-center px-2 md:px-0">
                    <img src={POS} alt="" className="w-[150px] h-[150px]" />
                    <div className="flex flex-col justify-center md:items-start gap-1">
                        <h1 className="font-bold text-xl">KB POS</h1>
                        <p className="text-gray-700 max-w-sm">We give out instant cash without any hidden charges or collateral. Are you a student or private worker or government worker?</p>
                    </div>
                </div>
                <div className="flex flex-wrap text-center justify-center items-center gap-8 px-2 md:px-0">
                    <img src={QRcode} alt="" className="w-[120px] h-[120px]" />
                    <div className="flex flex-col justify-center md:items-start gap-1">
                        <h1 className="font-bold text-xl">QR Codes</h1>
                        <p className="text-gray-700 max-w-sm">Get your CardpipX Business QRCode and start selling.</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Section_1;
