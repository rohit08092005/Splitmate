"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

import { SignInButton,SignUpButton,SignedIn,SignedOut,UserButton } from "@clerk/nextjs";
import { useStoreUser } from "@/hooks/use-store-user";
import {BarLoader} from "react-spinners";
import {usePathname} from "next/navigation";
import {Authenticated, Unauthenticated} from "convex/react"
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";
const Header =() =>{

    const {isLoading} = useStoreUser();
    const path=usePathname();
    return (<header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60">

        <nav className=" ml-4 mr-2 mx-auto h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
            <Image
            src={"/logos/logo2.png"}
            alt="Splitr Logo"
            width={200}
            height={60}
            className="h-11 w-auto object-contain"
            />
            </Link>


{/* features  and   How it works   only works when it is at home page or "/" */}
            {path==='/'&&(
                <div className="hidden md:flex items-center gap-8  ml-18">
                    <Link href="#features"
                        className="text-sm font-medium hover:text-green-600 transition"
                    >Features
                    </Link>
                     <Link href="#how-it-works"
                        className="text-sm font-medium hover:text-green-600 transition"
                    >How it works
                    </Link>
                </div>
            )}

            <div className="flex items-center gap-4 pr-2  ">

                <Authenticated>
                    <Link href="/dashboard">
                    <Button
                        variant="outline"
                        className="hidden md:inline-flex items-center gap-2 hover:text-green-600
                        hover:border-green-600 transition"
                        >
                        <LayoutDashboard className="h-4 w-4"/>
                        Dashboard
                        </Button>

                        <Button variant ="ghost" className="md:hidden w-10 h-10 p-0">
                            <LayoutDashboard className="h-4 w-4"/>
                        </Button>
                    </Link>

                    <UserButton/>
                </Authenticated>


                <Unauthenticated>
                    <SignInButton>
                        <Button variant={"ghost"}>Sign In</Button>
                    </SignInButton>


                <SignUpButton>
                    <Button className="bg-green-600 hover:bg-green-700 border-none">
                        Get Started
                    </Button>
                </SignUpButton>
                </Unauthenticated>
            </div>
         </nav>

            {isLoading && <BarLoader width={"100%"} color="#36d7b7" />}
    </header>
    );
    
};

export default Header;