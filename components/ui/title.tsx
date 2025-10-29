import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const titleVariants = cva("font-bold text-gray-800", {
    variants: {
        variant: {
            h1: "text-3xl ",
            h2: "text-2xl ",
            h3: "text-xl ",
            h4: "text-lg ",
            h5: "text-base font-bold",
        },
    },
    defaultVariants: {
        variant: "h1",
    },
});

interface TitleProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof titleVariants> {
    children: React.ReactNode;
}

const Title = ({
    children,
    variant = "h1",
    className,
    ...props
}: TitleProps) => {
    switch (variant) {
        case "h1":
            return (
                <h1
                    className={cn(titleVariants({ variant }), className)}
                    {...props}
                >
                    {children}
                </h1>
            );
        case "h2":
            return (
                <h2
                    className={cn(titleVariants({ variant }), className)}
                    {...props}
                >
                    {children}
                </h2>
            );
        case "h3":
            return (
                <h3
                    className={cn(titleVariants({ variant }), className)}
                    {...props}
                >
                    {children}
                </h3>
            );
        case "h4":
            return (
                <h4
                    className={cn(titleVariants({ variant }), className)}
                    {...props}
                >
                    {children}
                </h4>
            );
        case "h5":
            return (
                <h5
                    className={cn(titleVariants({ variant }), className)}
                    {...props}
                >
                    {children}
                </h5>
            );
    }
};

Title.displayName = "Title";

export { Title };
