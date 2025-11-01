"use client";
import Flex from "@/components/layout/Flex";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-button";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
    questionId: string;
    answers: { id: string; name: string }[];
    userId?: string;
    mySelectedAnswer?: string;
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
    const user = searchParams.get("user");
    const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
        undefined
    );
    const [isLoadingNext, setIsLoadingNext] = useState(false);
    const [isLoadingFinish, setIsLoadingFinish] = useState(false);

    useEffect(() => {
        setSelectedAnswer(mySelectedAnswer);
    }, [mySelectedAnswer]);
    console.log(selectedAnswer);
    const submitAnswer = async () => {
        const supabase = createClient();
        if (mySelectedAnswer) {
            await supabase
                .from("user_answers")
                .delete()
                .eq("question", questionId)
                .eq("user", userId);
        }

        const { data: userAnswer } = await supabase
            .from("user_answers")
            .insert({
                question: questionId,
                selected_answer: selectedAnswer,
                user: userId,
            })
            .select("id")
            .single();

        return { data: userAnswer };
    };

    const handleNext = async () => {
        setIsLoadingNext(true);
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
                }?user=${user}&totalQuestions=${totalQuestions}`
            );
        }
        setIsLoadingNext(false);
    };
    const handlePrev = () => {
        if (quizNo && parseInt(quizNo as string) > 1) {
            router.push(
                `/quiz/${tech}/${
                    parseInt(quizNo as string) - 1
                }?user=${user}&totalQuestions=${totalQuestions}`
            );
        }
    };
    const handleFinish = async () => {
        setIsLoadingFinish(true);
        if (selectedAnswer) {
            await submitAnswer();
        }

        router.push(
            `/quiz/${tech}/result?user=${user}&totalQuestions=${totalQuestions}`
        );
        setIsLoadingFinish(false);
    };

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
                <div>
                    {parseInt(quizNo as string) > 1 && (
                        <Button onClick={handlePrev}>Previous</Button>
                    )}
                </div>
                <div>
                    {totalQuestions > parseInt(quizNo as string) && (
                        <Button loading={isLoadingNext} onClick={handleNext}>
                            Next
                        </Button>
                    )}
                </div>
            </Flex>
            <Flex className="mt-10 justify-center">
                <Button loading={isLoadingFinish} onClick={handleFinish}>
                    Finish Quiz
                </Button>
            </Flex>
        </div>
    );
};

export default AnswerTemplate;
