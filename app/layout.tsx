import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Biomedical Data Science Lab | Technion",
    template: "%s | Aran Lab",
  },
  description:
    "Computational biology and precision medicine research lab at the Technion - Israel Institute of Technology. Led by Prof. Dvir Aran.",
  keywords: [
    "computational biology",
    "bioinformatics",
    "single-cell RNA-seq",
    "cancer immunology",
    "precision medicine",
    "Technion",
    "Dvir Aran",
    "xCell",
    "SingleR",
  ],
  openGraph: {
    title: "Biomedical Data Science Lab | Technion",
    description:
      "Computational biology and precision medicine research lab at the Technion. Led by Prof. Dvir Aran.",
    url: "https://aran-lab.com",
    siteName: "Aran Lab",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
