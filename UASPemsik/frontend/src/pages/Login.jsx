import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password:"",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(" ");
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(' ');
        setResponseMessage(' ');

        try{
            const response = await axios.post("http://demo-api.syaifur.io/api/login", form,{
                Headers: {
                    "Content-Type": "application/json",
                },
            });

            const authToken = response.data.data.token;
            localStorage.setItem("authToken", authToken);

            if (response.data.code === 200) {
                setResponseMessage(response.data.message);
                setForm({
                    email: "",
                    password: "",
                })
                Swal.fire({
                icon: "success",
                title: "Login Berhasil",
                text: response.data.message,
                });
                navigate("/dasboard")
            };
                          
        } catch (error) {
            if(error.response) {
                setErrorMessage(error.response.data.message || "Server Error");
            } else {
                setErrorMessage("No Connection")
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    return(
        <div className="m-0 p-0 h-screen bg-slate-400 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={form.password}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        onClick={() => navigate("/register")} // Arahkan ke halaman registrasi
                    >
                        Daftar
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading": "Login"}
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Login;