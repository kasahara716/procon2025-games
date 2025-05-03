'use client';

import { Container } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useFetchProblem } from '~/apis/problems';
import { ProblemPageLoading } from './loading';

export function ProblemPageTemplate() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { data, error, isLoading } = useFetchProblem(
        id ? parseInt(id, 10) : undefined,
    );

    if (isLoading) {
        return <ProblemPageLoading />;
    }

    if (!data || error) {
        return <Container>Error</Container>;
    }

    return (
        <Container>
            {data.id} {data.title}
        </Container>
    );
}
