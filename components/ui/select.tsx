import * as React from "react";

import { cn } from "@/lib/utils";

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectProps extends Omit<React.ComponentProps<"select">, "children"> {
    options?: SelectOption[];
    placeholder?: string;
    children?: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, options, placeholder, children, ...props }, ref) => {
        return (
            <select
                className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className
                )}
                ref={ref}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options
                    ? options.map((option) => (
                          <option
                              key={option.value}
                              value={option.value}
                              disabled={option.disabled}
                          >
                              {option.label}
                          </option>
                      ))
                    : children}
            </select>
        );
    }
);
Select.displayName = "Select";

export { Select };
