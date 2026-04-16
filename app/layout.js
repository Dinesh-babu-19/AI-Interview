import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";


const geistSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});


export const metadata = {
  title: "AI Mock Interview",
  description: "Created by Zionix Interv",
  icons: {
    icon: "/icon.svg", // ✅ your favicon in /public folder
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Toaster/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
