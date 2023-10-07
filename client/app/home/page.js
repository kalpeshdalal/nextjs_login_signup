"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <main className=" flex justify-center w-full h-screen items-center  font-extrabold ">
      <div>
      <div className="px-10  flex justify-center items-center text-[30px]  text-[#ffac4e] ">
        <div>Welcome to the Home Page !!</div>
      </div>
      <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
      <div className=" w-full  flex justify-center mt-5">
      <button   onClick={() => {signOut()}} className="w-24 bg-[#ffac4e] rounded-lg p-3">
            Logout
      </button>
      </div>
      </div>
    </main>
  );
}
