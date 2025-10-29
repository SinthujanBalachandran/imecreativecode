import React from "react";

interface FlexProps {
    direction?: "row" | "column" | "row-reverse" | "column-reverse";
    children: React.ReactNode;
    className?: string;
}

const Flex: React.FC<FlexProps> = ({
    direction = "row",
    children,
    className = "",
}) => {
    return (
        <div
            className={`flex flex-${direction} ${className}`}
            style={{ flexDirection: direction }}
        >
            {children}
        </div>
    );
};

export default Flex;
