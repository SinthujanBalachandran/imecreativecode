"use client";
import Flex from "@/components/layout/Flex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ContinueFailedModal from "./continue-failed-modal";

const ContinueForm = () => {
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);

    const handleContinue = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");

        const supabase = createClient();

        const { data: users } = await supabase
            .from("users")
            .select("id")
            .eq("email", email);

        if (users && users.length > 0) {
            setOpenModal(true);
            return;
        }
        router.push(`/quiz/HTML/1?user=${email}&isNewUser=false`);
    };

    return (
        <>
            <form onSubmit={handleContinue}>
                <Flex direction="column" className="mt-8 gap-4">
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-[400px]"
                        required={true}
                    />
                    <Button type="submit" className=" w-fit" size="lg">
                        Continue the Quiz
                    </Button>
                </Flex>
            </form>
            <ContinueFailedModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
};

export default ContinueForm;
