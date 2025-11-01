import BoardSmall from "@/app/module/leaderboard/components/board-small";
import Flex from "@/components/layout/Flex";
import Grid from "@/components/layout/Grid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Paragraph } from "@/components/ui/paragraph";
import { Title } from "@/components/ui/title";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const page = async () => {
    const supabase = await createClient();

    const { data: technologies } = await supabase.from("technologies").select(
        `
            id,
            name,
            category,
            questions(id)
            `
    );
    const frontendTechs = technologies?.filter(
        (tech) => tech.category === "front-end"
    );

    return (
        <div className="py-24 px-4  md:px-12">
            <Title variant="h1">iMe creative Quizzes</Title>
            <Paragraph className="mt-4">
                Test your knowledge with our interactive quizzes on web
                development topics. Challenge yourself and learn as you go!
            </Paragraph>
            <Grid className="mt-10 gap-6 grid-cols-1 md:grid-cols-3 ">
                <Card className="p-6">
                    <Title variant="h3" className="mb-2 ">
                        Front End
                    </Title>

                    <Paragraph size="small" className="mb-4">
                        Test your knowledge of Front End development with this
                        quiz. Answer the questions to the best of your ability!
                    </Paragraph>
                    <Flex className="mt-2 gap-2">
                        {frontendTechs?.map((tech) => (
                            <Link
                                key={tech.id}
                                href={`/quiz/start?tech=${tech.name}&totalQuestions=${tech.questions.length}`}
                                className="px-3 py-1 bg-red-100 rounded-md cursor-pointer"
                            >
                                {tech.name}
                            </Link>
                        ))}
                    </Flex>
                </Card>
                <Card className="p-6">
                    <Title variant="h3" className=" mb-2">
                        Back End
                    </Title>

                    <Paragraph size="small">Coming soon..</Paragraph>
                </Card>
                <Card className="p-6">
                    <Title variant="h3" className=" mb-2">
                        Database
                    </Title>

                    <Paragraph size="small">Coming soon..</Paragraph>
                </Card>
            </Grid>
            <Title variant="h2" className="mt-8">
                Leaderboard
            </Title>
            <BoardSmall className="mt-8 px-4 py-2 rounded-xl border bg-card text-card-foreground " />
            <div className="flex justify-center">
                <Link href="/quiz/leaderboard">
                    <Button className="mt-10 ">View Full Leaderboard</Button>
                </Link>
            </div>
        </div>
    );
};

export default page;
