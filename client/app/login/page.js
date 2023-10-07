"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(res);

      if (res.error) {
        setError("invalid credentials");
      } else {
        router.push("/home");
      }

      // const payload={email:email, password: password}
      // console.log(payload);
      // const response = await axios.post("http://localhost:4001/login", payload);
      // console.log(response);

      // if (response.status === 200) {
      //   alert(response.data.message);
      //   router.push("/home");
      // } else {
      //   alert(response.data.message);
      // }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="">
      <div className="px-10  flex justify-center items-center   text-[#ffac4e] ">
        <div className=" w-full h-20 flex justify-center items-center  text-[30px] font-bold ">
          Login
        </div>
      </div>
      <div className="px-10  flex justify-center items-center ">
        <div className="w-full h-full md:p-10 p-4 flex justify-center items-center ">
          <main className="w-[350px] rounded-xl border-[1px] border-[#636363] shadow-lg p-4">
            <form onSubmit={handleSubmit}>
              <div className="w-full ">
                <input
                  className="w-full p-3 rounded-lg text-black"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    if (email === "") {
                      setEmail(e.target.value);
                      setError(false);
                    } else {
                      setEmail(e.target.value);
                    }
                  }}
                />
                <input
                  className="w-full p-3 mt-5 rounded-lg text-black"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    if (password === "") {
                      setPassword(e.target.value)
                      setError(false);

                    } else {
                      setPassword(e.target.value);
                    }
                  }}
                />
                {error ? (
                  <div className="w-full p-2 text-sm bg-red-600 mt-5 rounded-lg ">
                    {error}
                  </div>
                ) : (
                  ""
                )}
                <span className="w-full flex justify-center mt-5">
                  <button
                    className="py-2 px-10 bg-[#ffac4e] text-black rounded-lg font-bold"
                    type="submit"
                  >
                    Login
                  </button>
                </span>
              </div>
            </form>
            <div className="w-full flex justify-center mt-5">
              <span>
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#ffac4e] hover:underline">
                  Signup
                </Link>
              </span>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
