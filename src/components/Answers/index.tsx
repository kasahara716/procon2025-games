'use client';

import {
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useFetchAnswers } from '~/apis/answers';

type Props = {
    problemId: number;
};

export default function Answers({ problemId }: Props) {
    const { data, isLoading } = useFetchAnswers(problemId);

    if (isLoading) {
        return <Skeleton variant="rectangular" width="100%" height={200} />;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>ペア数</TableCell>
                        <TableCell>操作数</TableCell>
                        <TableCell>回答者</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.answers.map((answer, index) => (
                        <TableRow key={answer.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{answer.pairCount}</TableCell>
                            <TableCell>{answer.operationCount}</TableCell>
                            <TableCell>{answer.user.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
