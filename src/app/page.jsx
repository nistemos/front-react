"use client";
import NavBar from "@/components/navBar/navBar";
import Footer from "@/components/footer";
import { useEffect } from "react";
import { useModalContext } from "@/context/modalcontext";
export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col items-center justify-between min-h-screen bg-gray-100 text-black">
        <h1>sdfsdf</h1>
      </main>
      <Footer />
    </>
  );
}
