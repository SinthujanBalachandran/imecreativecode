"use client";
import Flex from "@/components/layout/Flex";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface Props {
    userId: string | null;
}

const ResultActions = ({ userId }: Props) => {
    const router = useRouter();
    const { tech } = useParams();
    const searchParams = useSearchParams();
    const totalQuestions = parseInt(searchParams.get("totalQuestions") || "0");
    const user = searchParams.get("user");

    const handleRestart = async () => {
        const supabase = createClient();

        const { error } = await supabase
            .from("user_answers")
            .delete()
            .eq("user", userId);

        if (!error) {
            router.push(
                `/quiz/${tech}/1?user=${user}&totalQuestions=${totalQuestions}`
            );
        }
    };
    return (
        <Flex className="mt-8 justify-center">
            <Button onClick={handleRestart}>Restart Quiz</Button>
        </Flex>
    );
};

export default ResultActions;
