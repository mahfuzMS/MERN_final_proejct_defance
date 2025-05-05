import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-[#f0e6d7] text-[#885133] shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <NavLink to={"/"}>
                        <div className="text-xl font-bold tracking-wide">
                            Blog App
                        </div>
                    </NavLink>

                    <div className="hidden md:flex flex-1 justify-center space-x-6">
                        <NavLink
                            to="/blog"
                            className="px-4 py-2 rounded-md text-lg transition hover:bg-[#d62300] hover:text-[#f4f0ec]"
                        >
                            Blog View
                        </NavLink>
                        <NavLink
                            to="/dashboard"
                            className="px-4 py-2 rounded-md text-lg transition hover:bg-[#d62300] hover:text-[#f4f0ec]"
                        >
                            Dashboard
                        </NavLink>
                    </div>
                    <div className="hidden md:flex items-center">
                        <NavLink
                            to="/login"
                            className="px-4 py-2 rounded-md text-lg transition hover:bg-[#d62300] hover:text-[#f4f0ec]"
                        >
                            Login
                        </NavLink>
                    </div>

                    <div className="md:hidden">
                        <button onClick={toggleMenu} aria-label="Toggle Menu">
                            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-[#f0e6d7] px-4 py-4 space-y-3 text-center">
                    <NavLink
                        to="/blog"
                        onClick={toggleMenu}
                        className="block py-2 text-lg px-4 rounded-md transition hover:bg-[#d62300] hover:text-[#f4f0ec]"
                    >
                        Blog View
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        onClick={toggleMenu}
                        className="block py-2 text-lg px-4 rounded-md transition hover:bg-[#d62300] hover:text-[#f4f0ec]"
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/login"
                        onClick={toggleMenu}
                        className="block py-2 text-lg px-4 rounded-md transition hover:bg-[#d62300] hover:text-[#f4f0ec]"
                    >
                        Login
                    </NavLink>
                </div>
            )}
        </nav>
    );
}
