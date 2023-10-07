"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const session = await getServerSession(authOptions);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: name, email: email, password: password };
      if (password === confirmPassword) {
        console.log(payload);
        const response = await axios.post(
          "http://localhost:4001/signup",
          payload
        );
        console.log(response);

        if (response.status === 200) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      } else {
        alert("password does not match");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // if (session) redirect("/home");
  return (
    <main>
      <div className="px-10  flex justify-center items-center   text-[#ffac4e] ">
        <div className=" w-full h-20 flex justify-center items-center  text-[30px] font-bold ">
          Sign Up
        </div>
      </div>
      <div className="px-10  flex justify-center items-center ">
        <div className="w-full h-full md:p-10 p-4 flex justify-center items-center ">
          <main className="w-[350px]  rounded-xl border-[1px] border-[#636363] shadow-lg p-4   ">
            <form onSubmit={handleSubmit}>
              <div className=" w-full  ">
                <input
                  className="w-full p-3 rounded-lg text-black"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="w-full p-3 mt-5 rounded-lg text-black"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="w-full p-3 mt-5 rounded-lg text-black"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className="w-full p-3 mt-5 rounded-lg text-black"
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <span className="w-full flex justify-center mt-5">
                  <button
                    className="py-3 px-10 bg-[#ffac4e] text-black rounded-lg font-bold"
                    type="submit"
                  >
                    Submit
                  </button>
                </span>
              </div>
            </form>
            <div className="w-full flex justify-center mt-5">
              <span>
                Already having an account?{" "}
                <Link href="/" className="text-[#ffac4e] hover:underline">
                  Login
                </Link>
              </span>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
