import React from "react";
import { NavLink } from "react-router-dom";

export default function Registration() {

    const [users, SetUsers] = React.useState({
        name: "",
        email: "",
        password: "",
        gender: "",
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:8000/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(users),
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        // Clear the input fields
        SetUsers({ name: "", email: "", password: "", gender: "" });
    };

    const handleChange = (e) => {
        SetUsers({ ...users, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0e6d7] px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-[#885133] mb-6">
                    Create an Account
                </h2>
                <form className="space-y-5" onSubmit={handleFormSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-[#885133] mb-1">
                            Full Name
                        </label>
                        <input
                            onChange={handleChange}
                            value={users.name}
                            name="name"
                            type="text"
                            placeholder="Your name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d62300]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#885133] mb-1">
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            value={users.email}
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d62300]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#885133] mb-1">
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            value={users.password}
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d62300]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#885133] mb-2">
                            Gender
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="inline-flex items-center text-[#885133]">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={users.gender === "male"}
                                    onChange={handleChange}
                                    className="form-radio text-[#d62300]"
                                    required
                                />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="inline-flex items-center text-[#885133]">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={users.gender === "female"}
                                    onChange={handleChange}
                                    className="form-radio text-[#d62300]"
                                    required
                                />
                                <span className="ml-2">Female</span>
                            </label>
                            <label className="inline-flex items-center text-[#885133]">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    checked={users.gender === "other"}
                                    onChange={handleChange}
                                    className="form-radio text-[#d62300]"
                                    required
                                />
                                <span className="ml-2">Other</span>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#885133] text-white font-semibold py-2 rounded-md hover:bg-[#d62300] hover:text-[#f4f0ec] transition duration-300"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-[#885133]">
                    Already have an account?{" "}
                    <NavLink
                        to="/login"
                        className="underline hover:text-[#d62300]"
                    >
                        Login
                    </NavLink>
                </p>
            </div>
        </div>
    );
}
