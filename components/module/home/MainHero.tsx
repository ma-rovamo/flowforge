import { BackgroundPaths } from "./animated-hero";

export default function MainHero() {
	return (
		<BackgroundPaths
			title="FlowForge"
			subtitle="Powerful diagrams, effortlessly created"
			titleBackground={true}
			backgroundStyle="gradient" // Try "glass", "gradient", "solid", or "glow"
		/>
	);
}
