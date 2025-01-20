import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminSignup } from "../services/AdminServices";
import toast from "react-hot-toast";
import Loader from "./Loader";

interface SignInFormState {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState<SignInFormState>({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        // console.log("Form submitted:", formData);


        const response = await adminSignup(formData)
        console.log("response", response);
        if (!response.success) {
            const msg = response.error ? response.error.split(':')[2] : response.message
            toast.error(msg)
            setLoading(false)

            return;
        }

        toast.success(response.message)
        localStorage.setItem("token", JSON.stringify(response.token))
        setFormData({ name: "", email: "", password: "" });
        navigate('/dashboard')
        setLoading(false)
    };

    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gradient-to-r from-teal-400 to-blue-500">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
                    Sign Up
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
                        htmlFor="email"
                        className="block text-gray-600 text-sm font-medium mb-1"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-gray-600 text-sm font-medium mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                >
                    {loading ? <Loader/> : "Sign Up" } 
                </button>
                <h3 className="text-sm text-center mt-2">Already have an Account? <Link to={'/auth/signin'} className="hover:underline text-blue-500">Sign In</Link></h3>
            </form>
        </div>
    );
};

export default SignUp;
