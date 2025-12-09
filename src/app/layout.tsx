import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { plusJakarta, playfair, cormorant } from "@/lib/font";

export const metadata = {
title: "the_poshsociety — Prestigious Personal Shopper",
description: "Buy curated Ralph Lauren & more. Shipping to Malaysia, Singapore, Thailand.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en" className={`${cormorant.variable} ${plusJakarta.variable} ${playfair.variable}`}>
<body className="min-h-screen flex flex-col font-[family-name:var(--font-cor)]">
<Header />
<main className="flex-1 font-[family-name:var(--font-sans)]">{children}</main>
<Footer />
</body>
</html>
);
}

