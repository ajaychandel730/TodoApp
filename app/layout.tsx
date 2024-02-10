import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StateProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "todo app for add list of tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex ${inter.className} flex-col items-center justify-center h-[100dvh] w-full`}
      >
        <StateProvider>{children}</StateProvider>
      </body>
    </html>
  );
}
