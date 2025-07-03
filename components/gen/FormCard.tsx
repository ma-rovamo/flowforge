"use client";

import * as React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { generateContent } from "@/lib/actions/gemin";
import MermaidRenderer from "./MermaidRenderer";
import { Loader2, Send, Sparkles, RefreshCw } from "lucide-react";
import { Textarea } from "../ui/textarea";

const FormCard = () => {
	const [prompt, setPrompt] = React.useState("");
	const [response, setResponse] = React.useState<any | string>("");
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!prompt.trim()) {
			setError("Please enter a prompt");
			return;
		}

		try {
			setIsLoading(true);
			setError(null);
			const res = await generateContent(prompt);

			if (!res) {
				throw new Error("Failed to generate diagram");
			}

			setResponse(res.data?.diagram);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "An unexpected error occurred"
			);
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleClear = () => {
		setPrompt("");
		setResponse("");
		setError(null);
	};

	const handleExamplePrompt = (example: string) => {
		setPrompt(example);
	};

	return (
		<div className="w-full max-w-4xl mx-auto px-4 py-8">
			<div className="space-y-8">
				<div className="text-center space-y-2">
					<h1 className="text-3xl font-bold tracking-tight">
						Mermaid Diagram Generator
					</h1>
					<p className="text-muted-foreground">
						Describe what you want to visualize, and we'll generate a diagram
						for you
					</p>
				</div>

				{/* Results */}
				{response && <MermaidRenderer response={response} />}
				{/* Input Form */}
				<div>
					<form onSubmit={handleSubmit} className="p-4 space-y-4">
						<div className="space-y-2">
							<div className="relative">
								<Textarea
									id="prompt"
									className="w-full pr-10 min-h-[100px] resize-y"
									onChange={(e) => setPrompt(e.target.value)}
									value={prompt}
									placeholder="e.g., A flowchart showing the user authentication process"
									name="text"
									autoComplete="off"
									disabled={isLoading}
									style={{ height: "100px" }}
								/>
								{prompt && (
									<button
										type="button"
										onClick={handleClear}
										className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
							<div className="p-3 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-md">
								{error}
							</div>
						)}

						<div className="flex flex-col sm:flex-row gap-3 pt-2">
							<Button
								type="submit"
								className="flex-1 gap-2"
								disabled={isLoading || !prompt.trim()}>
								{isLoading ? (
									<>
										<Loader2 className="h-4 w-4 animate-spin" />
										Generating...
									</>
								) : (
									<>
										<Sparkles className="h-4 w-4" />
										Generate Diagram
									</>
								)}
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={handleClear}
								disabled={isLoading || (!prompt && !response)}>
								<RefreshCw className="h-4 w-4 mr-2" />
								Reset
							</Button>
						</div>
					</form>

					{/* Example prompts */}
					<div className="px-4 pb-4">
						<p className="text-xs text-muted-foreground mb-2">
							Try these examples:
						</p>
						<div className="flex flex-wrap gap-2">
							{[
								"A flowchart showing user registration process",
								"Sequence diagram of API authentication",
								"Entity relationship diagram for a blog database",
								"State diagram for a shopping cart checkout",
							].map((example, i) => (
								<button
									key={i}
									onClick={() => handleExamplePrompt(example)}
									className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
									{example}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormCard;
