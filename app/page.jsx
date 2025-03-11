"use client";
import React from "react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { UserCircle } from "lucide-react"; // Importing an icon

export default function Home() {
  return (
    <>
      <div>
        <header className="bg-emerald-950/70 flex justify-between items-center px-10 py-3">
          <h1 className="font-bold text-white text-2xl">SwiftPass</h1>
          <div className="flex justify-between gap-6 text-white">
            <a href="/events">Events</a>
            <a href="/contact">Contact</a>
          </div>

         {/* authetication */}
          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <UserCircle size={32} className="cursor-pointer text-white hover:text-gray-300" />
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </header>
      </div>

      <div className="bg-emerald-950/70 h-70 rounded-b-2xl text-center py-20">
        <h1 className="text-4xl font-bold text-emerald-950/90">
          Welcome to <span className="text-white/90">QR Check-In</span>
        </h1>
        <p className="text-gray-200 mt-8 font-extralight">
          Register and get your <br /> unique QR code for seamless entry
        </p>
      </div>

      <div className="flex justify-center mt-12">
        <button className="bg-white text-black px-4 py-2 font-bold">
          <a href="/events">Get Started</a>
        </button>
      </div>
    </>
  );
}