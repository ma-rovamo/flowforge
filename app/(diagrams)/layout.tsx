import React from "react";
import { LayoutProps } from "@/types";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
const layout = ({ children }: LayoutProps) => {
    return (
        <>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </>
    );
};

export default layout;
