import MainHeader from "@/components/module/home/Header";
import { LayoutProps } from "@/types";
import React from "react";

const layout = ({ children }: LayoutProps) => {
	return (
		<>
			<MainHeader />
			{children}
		</>
	);
};

export default layout;
