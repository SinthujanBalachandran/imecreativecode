import ResultActions from "@/app/module/quiz/components/result-actions";
import Grid from "@/components/layout/Grid";
import { Card } from "@/components/ui/card";
import { Paragraph } from "@/components/ui/paragraph";
import { RadioGroup } from "@/components/ui/radio-button";
import { Title } from "@/components/ui/title";
import { createClient } from "@/lib/supabase/server";

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

    const { data: myResult } = await supabase
        .from("user_answers")
        .select(
            "id,selected_answer,user(id),questions(id,question_no,name,weight,answers(id,name,is_correct),technology(id,name))"
        )
        .eq("user", user)
        .eq("questions.technology.name", tech);

    const sortedResult = myResult?.slice().sort((a, b) => {
        const aQuestion = Array.isArray(a.questions)
            ? a.questions[0]
            : a.questions;
        const bQuestion = Array.isArray(b.questions)
            ? b.questions[0]
            : b.questions;
        const aNo = aQuestion?.question_no ?? 0;
        const bNo = bQuestion?.question_no ?? 0;
        return aNo - bNo;
    });
    console.log(myResult);
    const correctAns = myResult?.filter((result) => {
        // Access the first question in the questions array
        const question = Array.isArray(result.questions)
            ? result.questions[0]
            : result.questions;
        const correctAnswer = question?.answers?.find(
            (answer) => answer.is_correct
        );
        return correctAnswer?.id === result.selected_answer;
    });

    const score = correctAns?.reduce((acc, curr) => {
        const question = Array.isArray(curr.questions)
            ? curr.questions[0]
            : curr.questions;
        return acc + (question?.weight || 0);
    }, 0);

    return (
        <div className="py-24 px-4 md:px-12">
            <Title>Your Quiz Results</Title>
            <Grid className="grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 mt-8">
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
            <ResultActions userId={user as string} />

            {sortedResult && sortedResult.length > 0 ? (
                <div>
                    {sortedResult.map((result) => (
                        <div key={result.id}>
                            <Paragraph
                                size="large"
                                className="mt-10 font-semibold"
                            >
                                Question No:{" "}
                                {
                                    (Array.isArray(result.questions)
                                        ? result.questions[0]
                                        : result.questions
                                    )?.question_no
                                }
                            </Paragraph>
                            <Paragraph size="large" className="mb-5 mt-2">
                                {
                                    (Array.isArray(result.questions)
                                        ? result.questions[0]
                                        : result.questions
                                    )?.name
                                }
                            </Paragraph>
                            <RadioGroup
                                name="quiz-question"
                                selectedValue={result.selected_answer}
                                options={(Array.isArray(result.questions)
                                    ? result.questions[0]
                                    : result.questions
                                )?.answers?.map((answer) => ({
                                    id: answer.id,
                                    value: answer.id,
                                    label: answer.name,
                                    isCorrect: answer.is_correct,
                                }))}
                                isResultView={true}
                            />
                            <p className="mt-2 font-semibold block md:hidden">
                                Correct Answer:{" "}
                            </p>
                            <p className="block md:hidden">
                                {
                                    (Array.isArray(result.questions)
                                        ? result.questions[0]
                                        : result.questions
                                    )?.answers?.find(
                                        (answer) => answer.is_correct
                                    )?.name
                                }
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <Paragraph size="large" className="my-8">
                        No results found.
                    </Paragraph>
                </div>
            )}
        </div>
    );
};

export default page;
