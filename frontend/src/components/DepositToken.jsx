import React, { useEffect, useState } from "react";
import ProfileNavbar from "./ProfileNavbar";
import { useSelector } from "react-redux";
import axios from "axios";
import backend_URL from "../config";

const DepositToken = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [imageFileUrl, setImageFileUrl] = useState(null);

    const [formData, setFormData] = useState({
        tokenId: "",
        secretCode: "",
        walletId: "",
        amount: "300",
        screenshot: ""
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];

        if (!file.type.startsWith("image/")) {
            setImageFileUploadError("File must be an image.");
            setImageFile(null);
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            // 2MB size limit
            setImageFileUploadError("File size must be less than 2MB.");
            setImageFile(null);
            return;
        }
        setImageFileUploadError(null);
        setImageFileUploading(true);
        if (file) {
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file));
        }
    }

    const uploadImage = async () => {
        setImageFileUploadError(null);
        if (!imageFile) {
            return null
        }
        setImageFileUploading(true)

        const data = new FormData()
        data.append("file", imageFile)
        data.append("upload_preset", "for_CardpipX")
        data.append("cloud_name", "dtfvymy9c")

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dtfvymy9c/image/upload", data)
            setImageFileUrl(response.data.secure_url)
            setFormData({ ...formData, screenshot: response.data.secure_url })
            setImageFileUploading(false)
        } catch (error) {
            setImageFileUploadError("Could not upload screenshot.");
            setImageFile(null);
            setImageFileUrl(null);
            setImageFileUploading(false);
            console.error("Error uploading image:", error);
        }
    }

    useEffect(() => {
        if (imageFile) {
            uploadImage()
        }
    }, [imageFile])


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        console.log(formData)

    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setErrorMessage(null)
        setSuccessMessage(null)

        if (
            formData.tokenId === "" ||
            formData.secretCode === "" ||
            formData.walletId === "" ||
            formData.amount === ""
        ) {
            setSuccessMessage(null);
            setErrorMessage("Field cannot be empty.");
            return;
        }


        // Prevent submission if image is still uploading or has not been uploaded
        if (imageFileUploading) {
            setErrorMessage("Image uploading in progress. Please wait.");
            return;
        }
        if (!imageFileUrl) {
            setErrorMessage("Please upload an image before submitting.");
            return;
        }

        try {
            setLoading(true)
            const response = await axios.post(`${backend_URL}/transaction/deposit/${currentUser._id}`, formData, {
                withCredentials: true
            })
            if (response) {
                setLoading(false)
                setErrorMessage(null)
                setSuccessMessage(response.data.message || "Request sent.")
                setTimeout(() => {
                    window.location.href = "/dashboard"
                }, 1000);
            }
        } catch (error) {
            setLoading(false)
            setSuccessMessage(null)
            setErrorMessage(error.response?.data?.message || "Some error occurred try again.")
        }
    }

    return (
        <div className="h-screen bg-[#f3f4f6]">
            <ProfileNavbar />
            <div className="h-[85vh] flex items-center justify-center">
                <form onSubmit={handleSubmitForm} className="depositForm bg-white p-6 md:p-12 rounded-lg shadow-2xl flex flex-col justify-center gap-5">
                    <div className="flex flex-col justify-center gap-1">
                        <label className="font-semibold text-sm text-gray-800">Token ID</label>
                        <input
                            type="text"
                            name="tokenId"
                            placeholder="Enter Token ID"
                            value={formData.tokenId}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-blue-600"
                        />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <label className="font-semibold text-sm text-gray-800">Secret Code</label>
                        <input
                            type="text"
                            name="secretCode"
                            placeholder="Enter Secret Code"
                            value={formData.secretCode}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-blue-600"
                        />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <label className="font-semibold text-sm text-gray-800">Wallet ID</label>
                        <input
                            type="text"
                            name="walletId"
                            placeholder="Enter Wallet Code"
                            value={formData.walletId}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-blue-600"
                        />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <label className="font-semibold text-sm text-gray-800">Amount</label>
                        <select
                            name="amount"
                            required
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-blue-600"
                        >
                            <option value={300} selected>300</option>
                            <option value={500}>500</option>
                            <option value={1000}>1000</option>
                        </select>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <label className="font-semibold text-sm text-gray-800">Upload Screenshot</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileInputChange}
                            name="screenshot"
                            required
                            className="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-blue-600"
                        />
                        {imageFileUploadError && <div className="text-red-600 mt-3 bg-red-100 p-2 rounded-md text-left max-w-sm">{imageFileUploadError}</div>}
                    </div>
                    <button disabled={imageFileUploading} type="submit" className={`w-full ${imageFileUploading ? "bg-gray-300 text-black" : "bg-[#22c55ee8] hover:bg-[#22C55E]  text-white"} rounded-md py-2 px-3 font-semibold`}>
                        {imageFileUploading ? "Uploading Image" : loading ? "Sending ..." : " Claim Reward 🎉"}
                    </button>
                    {errorMessage && <div className="text-red-600 mt-3 bg-red-100 p-2 rounded-md text-center">{errorMessage}</div>}
                    {successMessage && <div className="text-green-600 mt-3 bg-green-100 p-2 rounded-md text-center">{successMessage}</div>}
                </form>
            </div>
        </div>
    );
};

export default DepositToken;
