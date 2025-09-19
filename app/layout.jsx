import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FaHome, FaUser, FaFolder } from "react-icons/fa";
import {
  SidebarBody,
  SidebarLink,
  SidebarWrapper,
} from "@/components/sidebar/Sidebar";
import AuthProvider from "@/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SMK SALAFIYAH SYAFIIYAH",
  description:
    "Web Rekapitulasi Absensi untuk wali kelas SMK Salafiyyah Syafiiyah Desa Banuroja Kecamatan Randangan Kabupaten Pohuwato Provinsi Gorontalo",
};

export default function RootLayout({ children }) {
  const links = [
    { label: "Dashboard", href: "/dashboard", icon: <FaHome size={18} /> },
    { label: "About", href: "/about", icon: <FaUser size={18} /> },
    { label: "Projects", href: "/projects", icon: <FaFolder size={18} /> },
  ];
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {/* Wrapper utama dengan Flexbox */}
          <div className="flex h-screen">
            {/* Sidebar */}
            <SidebarWrapper>
              <SidebarBody>
                <div className="flex flex-col gap-2">
                  {links.map((link) => (
                    <SidebarLink key={link.href} link={link} />
                  ))}
                </div>
              </SidebarBody>
            </SidebarWrapper>

            {/* Konten utama yang mengisi sisa ruang */}
            <main className="flex-1 p-4 overflow-y-auto">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
