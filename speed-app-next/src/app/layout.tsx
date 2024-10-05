import "./globals.scss";
import { ReactNode } from "react";
import { ThemeProvider } from "../components/ThemeContext";
import Navbar from "@/components/Navbar";
import BootstrapJS from "@/components/BootstrapJS";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/utils/AuthContext"; // Import the AuthProvider

export const metadata = {
  title: "SPEED App",
  description: "A web application for evidence-based software practices",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <BootstrapJS />
      <body>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <div className="content-wrapper">{children}</div>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
