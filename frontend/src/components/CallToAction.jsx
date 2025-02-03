import React from "react";

const CallToAction = () => {
    return (
        <div className="bg-[#E1EAB5] w-full h-[20rem] md:h-[12rem] flex flex-col items-center justify-center mt-[5rem]">
            <h1 className="text-2xl font-semibold md:font-bold max-w-[12rem] sm:max-w-full">Get started with CardpipX today</h1>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-10 relative">
                <button className="mt-6 px-6 py-3 bg-white text-[#a8d122] font-semibold rounded-md cursor-pointer">Contact Sales</button>
                <button className="mt-6 px-6 py-3 bg-gradient-to-r from-[#9EE537] to-[#25C65D] text-white font-semibold rounded-md cursor-pointer">Collect with CardpipX</button>
            </div>
        </div>
    )
};

export default CallToAction;
