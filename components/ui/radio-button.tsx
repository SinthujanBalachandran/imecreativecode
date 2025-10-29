"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface RadioButtonProps {
    id: string;
    name: string;
    value: string;
    label: string;
    checked?: boolean;
    onChange?: (value: string) => void;
    isCorrect?: boolean;
    isResultView?: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
    id,
    name,
    value,
    label,
    checked,
    onChange,
    isCorrect,
    isResultView,
}) => {
    return (
        <div
            onClick={() => onChange?.(value)}
            className={cn(
                "flex items-center gap-2   p-4",
                checked
                    ? isResultView
                        ? isCorrect
                            ? "bg-green-300"
                            : "bg-orange-300"
                        : "bg-slate-300"
                    : "bg-slate-200",
                isResultView ? "" : "hover:bg-slate-300 cursor-pointer"
            )}
        >
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange?.(value)}
                className="w-5 h-5 "
                disabled={isResultView}
            />
            <label className="w-full " htmlFor={id}>
                {label} {isCorrect ? " (Correct Answer)" : ""} {id}
            </label>
        </div>
    );
};

interface RadioGroupProps {
    name: string;
    options: {
        id: string;
        value: string;
        label: string;
        isCorrect?: boolean;
    }[];
    selectedValue?: string;
    onChange?: (value: string) => void;
    isResultView?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
    name,
    options,
    selectedValue,
    onChange,
    isResultView,
}) => {
    return (
        <div className="flex flex-col gap-1">
            {options?.map((option) => (
                <RadioButton
                    key={option.id}
                    id={option.id}
                    name={name}
                    value={option.value}
                    label={option.label}
                    checked={selectedValue === option.value}
                    isCorrect={option.isCorrect}
                    onChange={onChange}
                    isResultView={isResultView}
                />
            ))}
        </div>
    );
};
