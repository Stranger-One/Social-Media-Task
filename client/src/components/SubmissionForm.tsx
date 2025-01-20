import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Loader from './Loader';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

interface FormData {
    name: string;
    handle: string;
    files: File[];
}
// console.log(import.meta.env.VITE_BACKEND_URL);


const SubmissionForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData>({
        name: "",
        handle: "",
        files: [],
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, files: Array.from(e.target.files) });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

        const data = new FormData();
        data.append("name", formData.name);
        data.append("socialMediaHandle", formData.handle);

        formData.files.forEach((file) => {
            data.append("files", file);
        });

        let response;
        try {
            response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/media/upload`, data);
        } catch (error) {
            toast.error("Upload failed. Please try again later.");
            console.error("Upload error:", error);
            return;
        } finally {
            setLoading(false);
        }

        // console.log("response", response.data);
        if (!response?.data?.success) {
            toast.error("Upload failed. Please try again later.");
            return;
        }

        toast.success('Files uploaded successfully! Your media has been saved.');
        const fileInput = document.getElementById("files") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        setFormData({
            name: "",
            handle: "",
            files: [],
        });
    };

    return (
        <div>
            <Link to={'/auth/signin'} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 flex justify-center gap-2 mb-5">Sign In as Admin</Link>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
                    Upload Your Details
                </h2>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-600 text-sm font-medium mb-1"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="handle"
                        className="block text-gray-600 text-sm font-medium mb-1"
                    >
                        Social Media Handle
                    </label>
                    <input
                        type="text"
                        id="handle"
                        name="handle"
                        value={formData.handle}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="@yourhandle"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="files"
                        className="block text-gray-600 text-sm font-medium mb-1"
                    >
                        Upload Images
                    </label>
                    <input
                        type="file"
                        id="files"
                        name="files"
                        multiple
                        onChange={handleFileChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 flex justify-center gap-2"
                >
                    {loading ? <Loader /> : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default SubmissionForm;
