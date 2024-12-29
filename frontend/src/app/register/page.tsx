"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';

const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  pwd: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/\d/, { message: "Password must include at least one number." }),
});

export default function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errors, setErrors] = useState({ username: "", email: "", pwd: "" });
  const router = useRouter();

  const validateField = (field: string, value: string) => {
    const result = signupSchema.safeParse({ [field]: value });
    if (result.success || !value) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } else {
      const errorMessage = result.error.errors.find((err) => err.path[0] === field)?.message || "";
      setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    }
  };

  const handleBlur = (field: string, value: string) => {
    validateField(field, value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validation = signupSchema.safeParse({ username, email, pwd });
    if (!validation.success) return;
    console.log({ username, email, pwd });
    const payload = {
        username,
        password:pwd,
        email
    }

    try{
        const res = await fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            credentials: "include",
          });
          if(res.ok)
          {
            toast.success("Successfully Registered")
            router.push("/")
          }
          else{
            toast.error("Register Failed")
          }
        console.log(res);
    }catch(e){
        console.log(e);
    }
  };

  const isFormInvalid = Object.values(errors).some((err) => err) || !username || !email || !pwd;

  return (
    <>
      <div className="container w-screen min-h-screen flex flex-col items-center justify-center bg-[#09090B] text-white">
        <div className="w-[23vw] bg-[#18181B] h-[auto] flex flex-col p-[20px] shadow-black/50 rounded-lg">
          <h3 className="text-2xl mb-6">SignUp</h3>
          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                onChange={(e) => setUsername(e.target.value)}
                onBlur={(e) => handleBlur("username", e.target.value)}
                value={username}
                type="text"
                placeholder="Username"
              />
              {errors.username && <small className="text-red-500 font-[10px]">{errors.username}</small>}
            </div>

            <div className="inputBox mt-3">
              <input
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => handleBlur("email", e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="inputBox mt-3">
              <input
                onChange={(e) => setPwd(e.target.value)}
                onBlur={(e) => handleBlur("pwd", e.target.value)}
                value={pwd}
                type="password"
                placeholder="Password"
              />
              {errors.pwd && <p className="text-red-500 text-sm">{errors.pwd}</p>}
            </div>

            <p className="mb-1 mt-2 text-[14px]">
              Already have an account?{" "}
              <Link className="text-[#1D4ED8]" href="/login">
                Login
              </Link>
            </p>

            <button
              type="submit"
              disabled={isFormInvalid}
              className={`btnBlue w-full text-[15px] ${isFormInvalid ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
