import React from "react";

const Transactions = ({ item }) => {
    return <div className="w-full mt-2 flex items-center justify-between border px-4 py-2 border-gray-200">
        <div className="w-full flex flex-col items-start justify-center font-normal">
            <p>{item.TransactionType}</p>
            <p className="text-gray-700 text-[13px]">{new Date(item.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} | {new Date(item.createdAt).toLocaleTimeString()}</p>
        </div>
        <div className="">
            <p className="w-[6rem] text-[14px] font-semibold">+ GHS {item?.withdrawalAmount || item?.amount}.00</p>
            {item.status === "pending" && <p className="font-sm text-[#EAB308] bg-[#F1F0DE] rounded-md py-1 px-2 text-center mt-1">{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</p>}
            {item.status === "rejected" && <p className="font-sm text-[#EF4444] bg-[#F1E8EA] rounded-md py-1 px-2 text-center mt-1">{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</p>}
            {item.status === "accepted" && <p className="font-sm text-green-600 bg-green-100 rounded-md py-1 px-2 text-center mt-1">{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</p>}
        </div>
    </div>;
};

export default Transactions;
