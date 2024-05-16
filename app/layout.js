import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider >
    <html lang="en">
      <body className={inter.className}>
      <nav className="flex flex-col bg-slate-400 p-5 ">
  <ul className="flex flex-row space-x-10 text-lg ">
    <li >
      <Link href="/">Home</Link>
    </li>
    <li>
      <Link href="/shop">Shop</Link>
    </li>
    <li className="flex-grow">

    </li>
    <li >
      <Link href="/shop/Cartpage">Cart</Link>
    </li>
  </ul>
</nav>

        {children}</body>
    </html>
    </StoreProvider>
  );
}
