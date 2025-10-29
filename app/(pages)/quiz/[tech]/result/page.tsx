import Grid from "@/components/layout/Grid";
import { Card } from "@/components/ui/card";
import { Paragraph } from "@/components/ui/paragraph";
import { RadioGroup } from "@/components/ui/radio-button";
import { Title } from "@/components/ui/title";
import { createClient } from "@/lib/supabase/server";
import React from "react";

const page = async ({
    params,
    searchParams,
}: {
    params: Promise<{ tech: string; quizNo: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const { tech } = await params;
    const { user } = await searchParams;

    const supabase = await createClient();

    // First, get the current user by email
    const { data: currentUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", user)
        .single();

    // Then get the user's answers using the user ID
    const { data: myResult, error } = await supabase
        .from("user_answers")
        .select(
            "id,selected_answer,question,user(id),questions(id,name,weight,answers(id,name,is_correct),technology(id,name))"
        )
        .eq("user", currentUser?.id)
        .eq("questions.technology.name", tech);
    console.log(myResult, error);

    const correctAns = myResult?.filter((result) => {
        // Access the first question in the questions array
        const question = result.questions?.[0];
        const correctAnswer = question?.answers?.find(
            (answer) => answer.is_correct
        );
        return correctAnswer?.id === result.selected_answer;
    });

    const score = correctAns?.reduce(
        (acc, curr) => acc + (curr.questions?.[0]?.weight || 0),
        0
    );

    return (
        <div className="py-24 px-8">
            <Title>Your Quiz Results</Title>
            <Grid className="grid-cols-3 gap-8 mt-8">
                <Card className="p-6">
                    <Title variant="h3" className=" mb-2">
                        Answered Questions
                    </Title>

                    <Paragraph size="small">{myResult?.length}</Paragraph>
                </Card>
                <Card className="p-6">
                    <Title variant="h3" className=" mb-2">
                        Correct Answers
                    </Title>

                    <Paragraph size="small">{correctAns?.length}</Paragraph>
                </Card>
                <Card className="p-6">
                    <Title variant="h3" className=" mb-2">
                        Your Score
                    </Title>

                    <Paragraph size="small">{score}</Paragraph>
                </Card>
            </Grid>
            {/* {myResult && myResult.length > 0 ? (
                <div>
                    {myResult.map((result) => (
                        <div key={result.id}>
                            <Paragraph size="large" className="my-8">
                                {result.questions?.name}
                            </Paragraph>
                            <RadioGroup
                                name="quiz-question"
                                selectedValue={result.selected_answer}
                                options={result?.questions?.answers?.map(
                                    (answer) => ({
                                        id: answer.id,
                                        value: answer.id,
                                        label: answer.name,
                                        isCorrect: answer.is_correct,
                                    })
                                )}
                                isResultView={true}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <Paragraph size="large" className="my-8">
                        No results found.
                    </Paragraph>
                </div>
            )} */}
        </div>
    );
};

export default page;
