import React from "react";
import Hero_img from "../assets/hero_img.png"
import { Link } from "react-router-dom";

const Hero = () => {
    return <div className="relative w-full">
        <img src={Hero_img} className="w-full h-[430px] md:h-[550px] object-cover transition-all duration-500" alt="" draggable="false" />
        <div className="absolute top-25 left-10 md:top-30 md:left-50 z-50 text-white">
            <h1 className="text-2xl md:text-6xl font-bold md:font-semibold max-w-[15rem] md:max-w-[30rem] transition-all duration-500">Join CardpipX rewards now</h1>
            <p className="mt-2 mb-6 md:mt-4  md:mb-8 max-w-[20rem] md:max-w-[40rem] transition-all duration-500">Double Up your small token Details and get Big Rewards from Kowirri Investment</p>
            <Link to="/register" className="bg-[#2cab48] font-normal px-4 py-2 text-md md:font-semibold md:px-8 md:py-3 rounded-md md:text-xl">Sign up</Link>
        </div>
    </div>;
};

export default Hero;
