import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  SidebarBody,
  SidebarLink,
  SidebarWrapper,
} from "@/components/sidebar/Sidebar";
import AuthProvider from "@/providers/AuthProvider";

import { ToasterProvider } from "@/providers/ToasterProvider";

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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ToasterProvider>
            {/* Wrapper utama dengan Flexbox */}
            <div className="flex h-screen">
              {/* Sidebar */}
              <SidebarWrapper>
                <SidebarBody>
                  <div className="flex flex-col gap-2 justify-between">
                    <SidebarLink />
                  </div>
                </SidebarBody>
              </SidebarWrapper>

              {/* Konten utama yang mengisi sisa ruang */}
              <main className="flex-1 p-6 overflow-y-auto">{children}</main>
            </div>
          </ToasterProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
