import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#885133] text-[#f4f0ec] py-4 ">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                {/* Footer Links */}
                <div className="flex space-x-8">
                    <NavLink to="/about" className="hover:text-[#d62300]">
                        About
                    </NavLink>
                    <NavLink to="/contact" className="hover:text-[#d62300]">
                        Contact
                    </NavLink>
                    <NavLink to="/privacy" className="hover:text-[#d62300]">
                        Privacy Policy
                    </NavLink>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-6">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#f4f0ec] hover:text-[#d62300]"
                    >
                        <FaFacebook size={24} />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#f4f0ec] hover:text-[#d62300]"
                    >
                        <FaTwitter size={24} />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#f4f0ec] hover:text-[#d62300]"
                    >
                        <FaInstagram size={24} />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#f4f0ec] hover:text-[#d62300]"
                    >
                        <FaLinkedin size={24} />
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-4">
                <p className="text-sm">
                    © {new Date().getFullYear()} Blog App. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
