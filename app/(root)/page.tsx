import FormCard from "@/components/gen/FormCard";
import AllDiagrams from "@/components/GetAllDiagram";


export default function Home() {
	return (
		<div className="flex flex-col items-center mx-auto justify-center max-w-4xl min-h-screen">
			<FormCard/>
			{/* <AllDiagrams/> */}
		</div>
	);
}
