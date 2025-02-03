import React, { useEffect, useState } from "react";
import backend_URL from "../config";
import axios from "axios";
import { MdCancel } from "react-icons/md";

const DashRejected = () => {
    const [rejectedData, setRejectedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setselectedImage] = useState(null);
    const [imageModel, setImageModel] = useState(false);

    useEffect(() => {
        const getRejected = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${backend_URL}/transaction/rejectedTransactions`);
                setRejectedData(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getRejected();
    }, []);

    const handleImageModel = (imageSource) => {
        setImageModel(true)
        setselectedImage(imageSource)
    }

    // Separate transactions based on type
    const depositTransactions = rejectedData.filter((t) => t.TransactionType === "Deposit");
    const creditTransactions = rejectedData.filter((t) => t.TransactionType === "Credit");

    return (
        <div className="md:mx-auto py-6 bg-white rounded-lg overflow-x-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
            {loading ? (
                <div className="loader" style={{ width: "30px" }}></div>
            ) : rejectedData.length === 0 ? (
                <p className="text-center text-gray-600 font-semibold">No rejected transactions available.</p>
            ) : (
                <>
                    {/* Deposit Transactions Table */}
                    {depositTransactions.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Rejected Deposit Transactions</h2>
                            <table className="w-full border border-gray-300">
                                <thead>
                                    <tr className="bg-[#0FBB4F] text-white">
                                        <th className="p-3 border">Date & Time</th>
                                        <th className="p-3 border">By</th>
                                        <th className="p-3 border">Email</th>
                                        <th className="p-3 border">Token ID</th>
                                        <th className="p-3 border">Secret Code</th>
                                        <th className="p-3 border">Wallet ID</th>
                                        <th className="p-3 border">Amount</th>
                                        <th className="p-3 border">Screenshot</th>
                                        <th className="p-3 border">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {depositTransactions.map((data, index) => (
                                        <tr key={index} className="hover:bg-gray-100 text-gray-700">
                                            <td className="p-3 border">
                                                {new Date(data.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} | {new Date(data.createdAt).toLocaleTimeString()}
                                            </td>
                                            <td className="p-3 border">{data.userId?.name || "N/A"}</td>
                                            <td className="p-3 border">{data.userId?.email || "N/A"}</td>
                                            <td className="p-3 border">{data.tokenId || "-"}</td>
                                            <td className="p-3 border">{data.secretCode || "-"}</td>
                                            <td className="p-3 border">{data.walletId || "-"}</td>
                                            <td className="p-3 border">{data.amount}</td>
                                            <td className="p-3 border cursor-pointer">
                                                {data.screenshot ? <img src={data.screenshot} className="w-8 h-8 object-cover" draggable="false" alt="Screenshot" onClick={() => handleImageModel(data.screenshot)} /> : "No Image"}
                                            </td>
                                            <td className="p-3 border text-red-500 font-semibold">{data.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Credit Transactions Table */}
                    {creditTransactions.length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Rejected Credit Transactions</h2>
                            <table className="w-full border border-gray-300">
                                <thead>
                                    <tr className="bg-[#D32F2F] text-white">
                                        <th className="p-3 border">Date & Time</th>
                                        <th className="p-3 border">By</th>
                                        <th className="p-3 border">Email</th>
                                        <th className="p-3 border">Account Name</th>
                                        <th className="p-3 border">Agent Service</th>
                                        <th className="p-3 border">Network Provider</th>
                                        <th className="p-3 border">Account Number</th>
                                        <th className="p-3 border">Withdrawal Amount</th>
                                        <th className="p-3 border">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {creditTransactions.map((data, index) => (
                                        <tr key={index} className="hover:bg-gray-100 text-gray-700">
                                            <td className="p-3 border">
                                                {new Date(data.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} | {new Date(data.createdAt).toLocaleTimeString()}
                                            </td>
                                            <td className="p-3 border">{data.userId?.name || "N/A"}</td>
                                            <td className="p-3 border">{data.userId?.email || "N/A"}</td>
                                            <td className="p-3 border">{data.accountName || "-"}</td>
                                            <td className="p-3 border">{data.agentService || "-"}</td>
                                            <td className="p-3 border">{data.networkProvider || "-"}</td>
                                            <td className="p-3 border">{data.accountNumber || "-"}</td>
                                            <td className="p-3 border">{data.withdrawalAmount}</td>
                                            <td className="p-3 border text-red-500 font-semibold">{data.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    )}
                </>
            )}
            {imageModel && <div className="fixed top-0 left-0 h-screen w-full" style={{ background: "rgba(0, 0, 0, 0.6)" }}>
                <div className="absolute md:top-10 md:right-10 top-2 right-2 z-50 text-4xl cursor-pointer" onClick={() => setImageModel(false)}>
                    <MdCancel className="text-white bg-black rounded-full" />
                </div>
                <div className="mx-auto mt-10">
                    <img src={selectedImage} alt="" className="w-full h-[90vh] object-contain" draggable="false" />
                </div>
            </div>
            }
        </div>
    );
};

export default DashRejected;
