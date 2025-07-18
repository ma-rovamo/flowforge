"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


export default function MainHeader() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 z-50 w-full transition-all duration-200 ${
				isScrolled ? "bg-blue-4	00/40 backdrop-blur-md" : ""
			}`}>
			<div className="container flex h-16 items-center justify-between px-4 md:px-6">
				<Link href="/" className="flex items-center space-x-2">
    <span className="relative z-10 text-2xl font-black tracking-tighter">
       
        <span className="bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
             Forge Flow
        </span>
        {/* Decorative Elements */}
        <span className="absolute -right-1.5 -top-1.5 h-2 w-2 animate-ping rounded-full bg-gradient-to-r from-blue-500 to-blue-500 opacity-75" />
        <span className="absolute -right-1.5 -top-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-500 shadow-md" />
    </span>
</Link>

				<nav className="hidden gap-6 md:flex justify-center  items-center">
					{/* <Link
						href="/generate"
						className="text-sm text-gray-500 dark:text-white font-medium hover:text-primary">
						Generate
					</Link> */}
					{/* <Link
						href="/about"
						className="text-sm text-gray-500 dark:text-white font-medium hover:text-primary">
						About
					</Link>
					<Link
						href="#testimonials"
						className="text-sm text-gray-500 dark:text-white font-medium hover:text-primary">
						Testimonials
					</Link>
					<Link
						href="#faq"
						className="text-sm text-gray-500 dark:text-white font-medium hover:text-primary">
						FAQ
					</Link> */}
				</nav>
				<div className="md:flex items-center justify-center gap-4 sm:block hidden">
					{/* <UserDropDown /> */}
						<Link
  href="/diagrams"
  className="inline-flex items-center gap-1 p-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl shadow-blue-500/25">
  <Sparkles className="h-4 w-4 text-white animate-pulse" />
  Generate
</Link>

				</div>
				<Sheet >
					<SheetTrigger  asChild>
						<Button variant="ghost" size="icon" className="md:hidden text-white">
							<Menu className="h-6 w-6" />
						</Button>
					</SheetTrigger>
					<SheetContent>
						<nav className="flex flex-col gap-4  items-center justify-center">
							<Link href="/generate" className="text-sm font-medium">
								Generate
							</Link>
							{/* <Link href="/about" className="text-sm font-medium">
								About
							</Link>
							<Link href="#testimonials" className="text-sm font-medium">
								Testimonials
							</Link>
							<Link href="#faq" className="text-sm font-medium">
								FAQ
							</Link> */}
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
