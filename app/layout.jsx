import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  SidebarBody,
  SidebarLink,
  SidebarWrapper,
} from "@/components/sidebar/Sidebar";
import AuthProvider from "@/providers/AuthProvider";
import {
  ClipboardList,
  Drama,
  FileCheck,
  LayoutDashboard,
  Sheet,
  ShieldCheck,
  SquareUser,
} from "lucide-react";
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
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={30} strokeWidth={2.25} />,
    },
    {
      label: "Data Siswa",
      href: "/siswa",
      icon: <SquareUser size={30} strokeWidth={2.25} />,
    },
    {
      label: "Rekap Absensi",
      href: "/rekap",
      icon: <Sheet size={30} strokeWidth={2.25} />,
    },
    {
      label: "Bakat & Minat",
      href: "/bakat-minat",
      icon: <Drama size={30} strokeWidth={2.25} />,
    },
    {
      label: "Pembinaan Wali",
      href: "/pembinaan-wali",
      icon: <ClipboardList size={30} strokeWidth={2.25} />,
    },
    {
      label: "Pembinaan Kasus",
      href: "/pembinaan-kasus",
      icon: <FileCheck size={30} strokeWidth={2.25} />,
    },
    {
      label: "Inventaris",
      href: "/inventaris",
      icon: <ShieldCheck size={30} strokeWidth={2.25} />,
    },
  ];
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
          </ToasterProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
