import HeroSection  from "@/components/HeroSection";
import BetaSection from "@/components/module/home/BetaSection";
import ExamplesSection from "@/components/module/home/ExampleSection";
import FeaturesSection from "@/components/module/home/FeaturedSection";
import ProblemSection from "@/components/module/home/ProblemSection";
import SolutionSection from "@/components/module/home/SolutionSection";


export default function Home() {
	return (
		< >
		<HeroSection/>
		<ProblemSection/>
		<SolutionSection/>
		<FeaturesSection/>
		<ExamplesSection/>
		<BetaSection/>
		</>
	);
}
