'use client';

import { Box, Container, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useFetchProblem } from '~/apis/problems';
import { ProblemPageLoading } from './loading';
import Field from '~/components/Field';
import Answers from '~/components/Answers';
import Link from 'next/link';
import { Suspense } from 'react';

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
            <Typography variant="h4" component="h2">
                問題フィールド
            </Typography>
            <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Field
                    field={{
                        size: data.fieldSize,
                        entities: data.fieldEntities,
                    }}
                />
                <Link href={`/player?id=${id}`}>
                    このフィールドを手動で試す
                </Link>
            </Box>
            <Typography variant="h4" component="h2">
                解答一覧
            </Typography>
            <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Suspense>
                    <Answers
                        problemId={data.id}
                        maxPairCount={data.fieldSize * data.fieldSize}
                    />
                </Suspense>
            </Box>
        </Container>
    );
}
