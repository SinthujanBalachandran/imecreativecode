import ContinueForm from "@/app/module/quiz/components/continue-form";
import StartForm from "@/app/module/quiz/components/start-form";
import { Paragraph } from "@/components/ui/paragraph";
import { Title } from "@/components/ui/title";

const page = async ({
    searchParams,
}: {
    params: Promise<{ tech: string }>;
    searchParams: Promise<{ [key: string]: string }>;
}) => {
    const { tech, totalQuestions } = await searchParams;

    return (
        <div className="py-24">
            <Title variant="h1">iMe creative {tech} Quizzes</Title>
            <Paragraph className="mt-4">
                Test your knowledge with our interactive quizzes on web
                development topics. Challenge yourself and learn as you go!
                total {totalQuestions}
            </Paragraph>
            <Title variant="h2" className="mt-10">
                The Test
            </Title>
            <Paragraph className="mt-2">
                Get ready to test your knowledge with our Front End Quiz!
            </Paragraph>
            <Title variant="h3" className="mt-6">
                Enter into quiz
            </Title>
            <Paragraph className="mt-2">
                The test contains 25 questions and there is no time limit. The
                test is not official, it's just a nice way to see how much you
                know, or don't know, about CSS.
            </Paragraph>
            <StartForm tech={tech} totalQuestions={totalQuestions} />
            <Title variant="h3" className="mt-10">
                Continue quiz
            </Title>
            <Paragraph className="mt-2">
                If you have already started the quiz, you can continue where you
                left off by entering your email below.
            </Paragraph>
            <ContinueForm />
        </div>
    );
};

export default page;
