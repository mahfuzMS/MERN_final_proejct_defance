import React from "react";
import { NavLink } from "react-router-dom";

export default function Registration() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0e6d7] px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-[#885133] mb-6">
                    Create an Account
                </h2>
                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-[#885133] mb-1">
                            Full Name
                        </label>
                        <input
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
                            type="password"
                            placeholder="Create a password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d62300]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#885133] mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d62300]"
                            required
                        />
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
