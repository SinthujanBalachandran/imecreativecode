import AnswerTemplate from "@/app/module/quiz/components/answer-template";
import { Paragraph } from "@/components/ui/paragraph";
import { Title } from "@/components/ui/title";
import { createClient } from "@/lib/supabase/server";

const page = async ({
    params,
    searchParams,
}: {
    params: Promise<{ tech: string; quizNo: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const { tech, quizNo } = await params;
    const { user, totalQuestions } = await searchParams;

    const supabase = await createClient();

    const { data: quiz } = await supabase
        .from("questions")
        .select(
            `   id,
                name,
                answers (
                    id,
                    name
                ),
                technology (
                    name
                )
                `
        )
        .eq("question_no", parseInt(quizNo))
        .eq("technology.name", tech)
        .single();

    const { data: myAnswer } = await supabase
        .from("user_answers")
        .select(
            "selected_answer,question,user(id),questions(id,name,technology(name))"
        )
        .eq("question", quiz?.id)
        .eq("user", user);

    return (
        <div className="py-24 px-4 md:px-12">
            <Title>{tech} Quiz</Title>
            <Paragraph className="mt-4 text-2xl">
                Question {quizNo} of {totalQuestions}
            </Paragraph>

            <Paragraph size="large" className="my-8">
                {quiz?.name}
            </Paragraph>
            <AnswerTemplate
                questionId={quiz?.id}
                answers={quiz?.answers || []}
                userId={user as string}
                mySelectedAnswer={
                    myAnswer && myAnswer.length > 0
                        ? myAnswer[0].selected_answer
                        : null
                }
            />
        </div>
    );
};

export default page;
