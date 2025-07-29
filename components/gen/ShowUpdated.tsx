"use client";

import * as React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Send, Sparkles, RefreshCw, Workflow, Eye, FolderOpen } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import LoadingComponent from "../LoadingComponent";
import { useSearchParams } from 'next/navigation'
import ReactFlowRenderer from "./test";
import { generateContentTest } from "@/lib/actions/flow";
import Link from "next/link";

const FormCardTest = () => {
	const router = useRouter();
	const [prompt, setPrompt] = React.useState("");
	const [response, setResponse] = React.useState<any | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	const [generatedId, setGeneratedId] = React.useState<string | null>(null);
	const searchParams = useSearchParams()

	const params = searchParams.get('prompt') as any
	React.useEffect(() => {
		if (params && !prompt) {
			setPrompt(params);
		}
	}, [params]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!prompt.trim()) {
			setError("Please enter a prompt");
			return;
		}

		try {
			setIsLoading(true);
			setError(null);
			const res = await generateContentTest(prompt);
			const id = res.data?.id;
			if (res.success) {
				setResponse(res.data?.diagram);
				// @ts-ignore
				setGeneratedId(id);
			} else {
				throw new Error("Failed to generate diagram");
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "An unexpected error occurred"
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleClear = () => {
		setPrompt("");
		setResponse(null);
		setError(null);
		setGeneratedId(null);
	};

	const handleExamplePrompt = (example: string) => {
		setPrompt(example);
	};

	return (
		<div className="w-full max-w-6xl mx-auto px-4 py-8">
			<div className="space-y-8">
				{/* Header */}
				<div className="text-center space-y-2">
					<h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
						<Workflow className="h-8 w-8 text-blue-600" />
						React Flow Diagram Generator
					</h1>
					<p className="text-muted-foreground">
						Describe what you want to visualize, and we'll generate an interactive flow diagram for you
					</p>
					
					{/* Navigation Link */}
					<div className="pt-2">
						<Link href="/diagrams">
							<Button variant="outline" className="gap-2">
								<FolderOpen className="h-4 w-4" />
								View All Diagrams
							</Button>
						</Link>
					</div>
				</div>

				{/* Results */}
				{response && (
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold">Generated Diagram</h2>
							{generatedId && (
								<div className="flex gap-2">
									<Link href={`/diagrams/${generatedId}`}>
										<Button variant="outline" size="sm" className="gap-2">
											<Eye className="h-4 w-4" />
											View Full Screen
										</Button>
									</Link>
								</div>
							)}
						</div>
						<ReactFlowRenderer response={response} />
						{generatedId && (
							<div className="text-center">
								<p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
									Your diagram has been saved! You can view, edit, and download it anytime.
								</p>
								<Link href={`/diagrams/${generatedId}`}>
									<Button className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
										<Eye className="h-4 w-4" />
										Open in Editor
									</Button>
								</Link>
							</div>
						)}
					</div>
				)}

				{/* Input Form */}
				{isLoading ? (
					<LoadingComponent />
				) : (
					<div>
						<form onSubmit={handleSubmit} className="p-6 space-y-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
							<div className="space-y-3">
								<div className="relative group">
									<Textarea
										id="prompt"
										className="w-full pr-12 min-h-[120px] resize-y text-base leading-relaxed border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
										onChange={(e) => setPrompt(e.target.value)}
										value={prompt}
										placeholder="✨ Describe your flow diagram... e.g., A user authentication process with login, validation, and dashboard access"
										name="text"
										autoComplete="off"
										disabled={isLoading}
										style={{ height: "120px" }}
									/>
									{prompt && (
										<button
											type="button"
											onClick={handleClear}
											className="absolute right-3 top-3 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-110"
											aria-label="Clear input">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round">
												<line x1="18" y1="6" x2="6" y2="18"></line>
												<line x1="6" y1="6" x2="18" y2="18"></line>
											</svg>
										</button>
									)}
								</div>
							</div>

							{error && (
								<div className="p-4 text-sm bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl shadow-lg">
									{error}
								</div>
							)}

							<div className="flex flex-col sm:flex-row gap-4 pt-2">
								<Button
									type="submit"
									className="flex-1 gap-2 px-6 py-3 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
									disabled={isLoading || !prompt.trim()}>
									{isLoading ? (
										<>
											<Loader2 className="h-5 w-5 animate-spin" />
											Generating...
										</>
									) : (
										<>
											<Sparkles className="h-5 w-5" />
											Generate Flow Diagram
										</>
									)}
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={handleClear}
									className="px-6 py-3 text-base font-medium border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950 dark:hover:to-purple-950 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
									disabled={isLoading || (!prompt && !response)}>
									<RefreshCw className="h-5 w-5 mr-2" />
									Reset
								</Button>
							</div>
						</form>

						{/* Example prompts */}
						<div className="px-6 pb-6">
							<p className="text-sm text-muted-foreground mb-3 font-medium">
								✨ Try these examples:
							</p>
							<div className="flex flex-wrap gap-3">
								{[
									"A user registration process with email verification",
									"E-commerce checkout flow with payment processing",
									"Software deployment pipeline with testing stages",
									"Customer support ticket workflow",
									"API authentication and authorization flow",
									"Data processing pipeline with validation steps"
								].map((example, i) => (
									<button
										key={i}
										onClick={() => handleExamplePrompt(example)}
										className="text-sm px-4 py-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600">
										{example}
									</button>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default FormCardTest;