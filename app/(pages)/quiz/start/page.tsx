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
        <div className="py-24 px-4 md:px-12">
            <Title variant="h1">iMe creative {tech} Quizzes</Title>
            <Paragraph className="mt-4">
                Get ready to test your knowledge with our {tech} Quiz!
            </Paragraph>
            <Title variant="h2" className="mt-10">
                Instructions
            </Title>
            <ul className="mt-2 list-disc list-inside space-y-1">
                <li>The quiz contains {totalQuestions} questions in total.</li>
                <li>
                    Each question has 4 answer options. Please select only one
                    answer per question.
                </li>
                <li>There is no time limit for completing the quiz.</li>
                <li>You may participate any number of times.</li>
                <li>
                    You can finish the quiz at any question number; it is not
                    necessary to complete all questions in one attempt.
                </li>
                <li>
                    After finishing, you will receive your results along with
                    the details of your answers
                </li>
                <li>
                    Each question carries a weight, which will be used to
                    calculate your score.
                </li>
                <li>
                    Your score will be used to create a leaderboard, so you can
                    see how you rank compared to others.
                </li>
            </ul>
            <Title variant="h3" className="mt-6">
                Enter into quiz
            </Title>
            <Paragraph className="mt-2">
                If you are a new user, please enter your details below to start
            </Paragraph>
            <StartForm tech={tech} totalQuestions={totalQuestions} />
            <Title variant="h3" className="mt-10">
                Continue quiz
            </Title>
            <Paragraph className="mt-2">
                If you have already started the quiz, you can continue where you
                left off by entering your email below.
            </Paragraph>
            <ContinueForm tech={tech} totalQuestions={totalQuestions} />
        </div>
    );
};

export default page;
