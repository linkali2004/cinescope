"use client";
import React, { useEffect, useState } from 'react';
import logo from "../../public/logo.png";
import Avatar from 'react-avatar';
import Image from 'next/image';
import { toast } from 'sonner';

export default function Navbar() {
  const [data, setData] = useState<string>("");

  const getDetails = async () => {
    try {
      const res = await fetch("http://localhost:8000/who", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.ok) {
        const d = await res.json();
        setData(d);
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("An error occurred while fetching user details:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8000/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Logged Out Succcessfully")
        console.log("Logged out successfully");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <nav className="bg-[#0a0a0a] p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="#">
            <Image src={logo} alt="Logo" width={70} height={70} />
          </a>
        </div>
        {/* Search Box */}
        <div className="flex-grow mx-4">
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-lg p-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {data && (
            <>
              <a href="#">
                <Avatar
                  round="50%"
                  className="cursor-pointer"
                  name={data || "User"}
                  size="40"
                />
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
