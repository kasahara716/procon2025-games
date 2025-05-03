'use client';

import { Container } from '@mui/material';
import Link from 'next/link';
import { useFetchProblems } from '~/apis/problems';
import { TopPageLoading } from './loading';

export function TopPageTemplate() {
    const { data, isLoading } = useFetchProblems();

    if (isLoading) {
        return <TopPageLoading />;
    }

    return (
        <Container>
            <Link href="/player">プレイヤー</Link>
            {data.problems.map((problem: { title: string; id: number }) => (
                <div key={problem.id}>
                    <Link href={`/problem?id=${problem.id}`}>
                        {problem.title}
                    </Link>
                </div>
            ))}
        </Container>
    );
}
