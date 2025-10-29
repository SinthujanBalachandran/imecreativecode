import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return <div className="max-w-[1200px] mx-auto">{children}</div>;
}
