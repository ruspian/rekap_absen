"use client";

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginButton = ({ children }) => {
  const router = useRouter();

  const { data: session, status } = useSession();

  // jika login berhasil
  useEffect(() => {
    // cek status dan sesi
    if ((status === "authenticated" && session) !== null) {
      router.push("/dashboard"); // arahkan ke halaman dashboard
    }
  }, [status, session]); // muat ulang saat session atau status berubah

  return (
    <button
      className="
        group 
        relative 
        inline-flex items-center justify-center
        px-3 py-2
        bg-black text-white 
        rounded-lg 
        font-semibold
        overflow-visible
        transition-colors duration-300
        hover:bg-gray-800
        cursor-pointer
      "
      onClick={() => signIn("google")}
    >
      {/* --- Logo yang Muncul Saat Hover --- */}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:rotate-6 transition-all duration-300 ease-out">
        <span className="flex rounded-full p-2 items-center justify-center">
          <Image
            src="/google.svg"
            width={70}
            height={70}
            alt="Logo Google login"
          />
        </span>
      </span>

      {/* --- Teks Button --- */}
      <span>{children}</span>
    </button>
  );
};

export default LoginButton;
