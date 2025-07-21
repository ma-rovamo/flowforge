"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Sparkles, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MainHeader() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${
				isScrolled 
					? "bg-white/10 backdrop-blur-xl border-white/10 shadow-lg shadow-black/5" 
					: "bg-transparent"
			}`}>
			<div className=" mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
				{/* Logo Section */}
				<Link href="/" className="flex items-center space-x-2 group">
					<div className="relative">
						<span className="text-2xl md:text-3xl font-black tracking-tighter bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
							Forge Flow
						</span>
						{/* Animated dot */}
						<span className="absolute -right-2 -top-2 flex h-3 w-3">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"></span>
						</span>
					</div>
				</Link>

				{/* Desktop Navigation - Center */}
				<nav className="hidden md:flex items-center space-x-8">
					{/* <Link
						href="/features"
						className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group">
						Features
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-200"></span>
					</Link>
					<Link
						href="/about"
						className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group">
						About
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-200"></span>
					</Link>
					<Link
						href="#testimonials"
						className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group">
						Testimonials
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-200"></span>
					</Link>
					<Link
						href="#faq"
						className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group">
						FAQ
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-200"></span>
					</Link> */}
				</nav>

				{/* Generate Button - Desktop (Always on the right) */}
				<div className="hidden md:flex items-center">
					<Link
						href="/diagrams"
						className="group relative inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden">
						{/* Background glow effect */}
						<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
						<div className="relative flex items-center gap-2">
							<Sparkles className="h-4 w-4 text-white animate-pulse group-hover:rotate-12 transition-transform duration-300" />
							Generate
						</div>
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden text-white hover:bg-white/10 transition-colors duration-200">
							<Menu className="h-6 w-6" />
						</Button>
					</SheetTrigger>
					<SheetContent className="bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl border-white/10">
						<div className="flex flex-col h-full">
							{/* Mobile Navigation */}
							<nav className="flex flex-col gap-6 mt-8">
								{/* <Link 
									href="/features" 
									className="text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200 py-2">
									Features
								</Link>
								<Link 
									href="/about" 
									className="text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200 py-2">
									About
								</Link>
								<Link 
									href="#testimonials" 
									className="text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200 py-2">
									Testimonials
								</Link>
								<Link 
									href="#faq" 
									className="text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200 py-2">
									FAQ
								</Link> */}
							</nav>

							{/* Mobile Generate Button */}
							<div className="mt-auto mb-8">
								<Link
									href="/diagrams"
									className="group relative inline-flex items-center justify-center gap-2 w-full px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden">
									{/* Background glow effect */}
									<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
									<div className="relative flex items-center gap-2">
										<Sparkles className="h-5 w-5 text-white animate-pulse group-hover:rotate-12 transition-transform duration-300" />
										Generate
									</div>
								</Link>
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}