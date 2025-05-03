'use client';

import { Container, Stack } from '@mui/material';
import Link from 'next/link';
import { useFetchProblems } from '~/apis/problems';
import { TopPageLoading } from './loading';
import ProblemItem from '~/components/ProblemItem';

export function TopPageTemplate() {
    const { data, isLoading } = useFetchProblems();

    if (isLoading) {
        return <TopPageLoading />;
    }

    return (
        <Container>
            <Link href="/player">プレイヤー</Link>
            <Stack spacing={2}>
                {data.problems.map((problem: { title: string; id: number }) => (
                    <ProblemItem key={problem.id} problem={problem} />
                ))}
            </Stack>
        </Container>
    );
}
