"use client";
import Flex from "@/components/layout/Flex";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import ContinueModal from "./continue-modal";
import { useState } from "react";
import { countries } from "@/lib/countries";

interface Props {
    tech: string;
    totalQuestions: string;
}

const StartForm = ({ tech, totalQuestions }: Props) => {
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState<string>("");

    const supabase = createClient();

    const handleStart = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name");
        const email = formData.get("email");
        const country = formData.get("country");

        const { data: users } = await supabase
            .from("users")
            .select("id")
            .eq("email", email);

        if (users && users.length > 0) {
            setEmail(email as string);
            setOpenModal(true);
            return;
        }

        const { data: newUser } = await supabase
            .from("users")
            .insert({
                name,
                email,
                country,
            })
            .select()
            .single();

        router.push(
            `/quiz/${tech}/1?user=${newUser?.email}&totalQuestions=${totalQuestions}`
        );
    };

    const handleExit = () => {
        // delete answers associated with the email
        setOpenModal(false);
        router.push(
            `/quiz/${tech}/1?user=${email}&totalQuestions=${totalQuestions}`
        );
    };

    const handleOk = () => {
        setOpenModal(false);
        // find last question answered by the user
        router.push(
            `/quiz/${tech}/1?user=${email}&totalQuestions=${totalQuestions}`
        );
    };

    return (
        <>
            <form onSubmit={handleStart}>
                <Flex direction="column" className="mt-8 gap-4">
                    <Input
                        name="name"
                        placeholder="Enter your name"
                        className="w-[400px]"
                        required={true}
                    />
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-[400px]"
                        required={true}
                    />
                    <Select
                        name="country"
                        className="w-[400px]"
                        options={countries().map((country) => ({
                            value: country.value,
                            label: country.label,
                        }))}
                        placeholder="Select a country"
                        required={true}
                        defaultValue=""
                    />
                    <Button type="submit" className=" w-fit" size="lg">
                        Start the Quiz
                    </Button>
                </Flex>
            </form>
            <ContinueModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onOk={handleOk}
                onExit={handleExit}
            />
        </>
    );
};

export default StartForm;
