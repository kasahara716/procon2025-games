'use client';

import {
    Box,
    Pagination,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useFetchAnswers } from '~/apis/answers';

type Props = {
    problemId: number;
    maxPairCount: number;
    page: number;
};

export default function Answers({ problemId, maxPairCount, page }: Props) {
    const router = useRouter();
    const { data, isLoading } = useFetchAnswers(problemId, (page - 1) * 20);

    if (isLoading) {
        return <Skeleton variant="rectangular" width="100%" height={200} />;
    }

    const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
        router.push(`/problems?page=${page}`);
    };

    return (
        <>
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
                                <TableCell>
                                    {answer.pairCount} / {maxPairCount}
                                </TableCell>
                                <TableCell>{answer.operationCount}</TableCell>
                                <TableCell>
                                    {answer.user.name}◆{answer.user.handle}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Pagination
                    sx={{ display: 'inline-block' }}
                    count={Math.ceil((data?.totalCount || 1) / 20)}
                    defaultPage={page}
                    onChange={handleChangePage}
                />
            </Box>
        </>
    );
}
