import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import React from "react";

const BoardSmall: React.FC<React.HTMLAttributes<HTMLDivElement>> = async (
    props
) => {
    const supabase = await createClient();

    const { data: userAnswers } = await supabase.from("user_answers").select(
        `*,answers(*)
                `
    );

    console.log(userAnswers);

    return (
        <div {...props}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Player 1</TableCell>
                        <TableCell>Country 1</TableCell>
                        <TableCell>100</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Player 1</TableCell>
                        <TableCell>Country 1</TableCell>
                        <TableCell>100</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Player 1</TableCell>
                        <TableCell>Country 1</TableCell>
                        <TableCell>100</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default BoardSmall;
