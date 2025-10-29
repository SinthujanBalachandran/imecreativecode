import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const paragraphVariants = cva("text-foreground", {
    variants: {
        size: {
            large: "text-lg leading-7",
            medium: "text-base leading-6",
            small: "text-sm leading-5",
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

export interface ParagraphProps
    extends React.HTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof paragraphVariants> {
    children?: React.ReactNode;
}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
    ({ className, size, ...props }, ref) => {
        return (
            <p
                className={cn(paragraphVariants({ size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Paragraph.displayName = "Paragraph";

export { Paragraph, paragraphVariants };
