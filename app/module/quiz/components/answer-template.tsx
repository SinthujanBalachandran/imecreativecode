"use client";
import Flex from "@/components/layout/Flex";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-button";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
    questionId: number;
    answers: { id: number; name: string }[];
    userId?: number;
    mySelectedAnswer?: number;
}

const AnswerTemplate = ({
    questionId,
    answers,
    userId,
    mySelectedAnswer,
}: Props) => {
    const router = useRouter();
    const { tech, quizNo } = useParams();
    const searchParams = useSearchParams();
    const totalQuestions = parseInt(searchParams.get("totalQuestions") || "0");
    const isNew = searchParams.get("isNew");
    const user = searchParams.get("user");
    const [selectedAnswer, setSelectedAnswer] = useState<
        number | string | undefined
    >(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setSelectedAnswer(mySelectedAnswer);
    }, [mySelectedAnswer]);

    const submitAnswer = async () => {
        setIsLoading(true);
        const supabase = createClient();
        if (mySelectedAnswer) {
            await supabase
                .from("user_answers")
                .delete()
                .eq("question", questionId)
                .eq("user", userId);
        }
        console.log("selected ans", selectedAnswer);
        const { data: userAnswer, error: userAnswerError } = await supabase
            .from("user_answers")
            .insert({
                question: questionId,
                selected_answer: selectedAnswer,
                user: userId,
            })
            .select("id")
            .single();
        console.log(userAnswerError);
        setIsLoading(false);
        return { data: userAnswer };
    };

    const handleNext = async () => {
        const { data } = await submitAnswer();
        if (
            data?.id &&
            totalQuestions &&
            quizNo &&
            totalQuestions > parseInt(quizNo as string)
        ) {
            router.push(
                `/quiz/${tech}/${
                    parseInt(quizNo as string) + 1
                }?user=${user}&isNew=${isNew}&totalQuestions=${totalQuestions}`
            );
        }
    };
    const handlePrev = () => {
        if (quizNo && parseInt(quizNo as string) > 1) {
            router.push(
                `/quiz/${tech}/${
                    parseInt(quizNo as string) - 1
                }?user=${user}&isNew=${isNew}&totalQuestions=${totalQuestions}`
            );
        }
    };
    const handleFinish = async () => {
        if (selectedAnswer) {
            await submitAnswer();
        }

        router.push(
            `/quiz/${tech}/result?user=${user}&isNew=${isNew}&totalQuestions=${totalQuestions}`
        );
    };
    console.log(answers);
    return (
        <div>
            <RadioGroup
                name="quiz-question"
                selectedValue={selectedAnswer}
                options={answers?.map((answer) => ({
                    id: answer.id,
                    value: answer.id,
                    label: answer.name,
                }))}
                onChange={(e) => setSelectedAnswer(e)}
            />
            <Flex className="justify-between mt-8">
                <Flex className="justify-between gap-4">
                    {parseInt(quizNo as string) > 1 && (
                        <Button onClick={handlePrev}>Previous</Button>
                    )}
                    {totalQuestions > parseInt(quizNo as string) && (
                        <Button loading={isLoading} onClick={handleNext}>
                            Next
                        </Button>
                    )}
                </Flex>
                <Button loading={isLoading} onClick={handleFinish}>
                    Finish
                </Button>
            </Flex>
        </div>
    );
};

export default AnswerTemplate;
