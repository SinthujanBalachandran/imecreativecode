import React, { useEffect, useRef } from "react";
import { Button } from "./button";
import { Title } from "./title";

type ContinueModalProps = {
    open: boolean;
    onClose: () => void;
    onExit?: () => void;
    title?: string;
    children?: React.ReactNode;
    okText?: string;
    onOk?: () => void;
    cancelText?: string;
};

const backdropStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
};

const panelStyle: React.CSSProperties = {
    background: "white",
    borderRadius: 8,
    padding: 20,
    width: "min(560px, 90vw)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    position: "relative",
};

const footerStyle: React.CSSProperties = {
    display: "flex",
    gap: 8,
    justifyContent: "flex-end",
    marginTop: 16,
};

export default function Modal({
    open,
    onClose,
    onExit,
    title,
    children,
    okText,
    onOk,
    cancelText,
}: ContinueModalProps) {
    const continueRef = useRef<HTMLButtonElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!open) return;
        // focus first actionable element
        continueRef.current?.focus();

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "Tab") {
                // simple focus trap (keeps focus inside panel)
                const focusable =
                    panelRef.current?.querySelectorAll<HTMLElement>(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                if (!focusable || focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            style={backdropStyle}
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="continue-modal-title"
                aria-describedby="continue-modal-desc"
                style={panelStyle}
            >
                <Title variant="h4" id="continue-modal-title" className="mb-2 ">
                    {title}
                </Title>
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="font-semibold text-2xl absolute top-2 right-4 hover:text-gray-600"
                >
                    ×
                </button>

                {children}
                <div style={footerStyle}>
                    <Button
                        variant="outline"
                        onClick={() => {
                            onExit?.();
                            onClose();
                        }}
                    >
                        {cancelText || "Cancel"}
                    </Button>

                    <Button
                        ref={continueRef}
                        onClick={() => {
                            onOk?.();
                            onClose();
                        }}
                    >
                        {okText || "OK"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
