'use client';

import { Box, Container, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useFetchProblemDetail } from '~/apis/problems';
import { ProblemPageLoading } from './loading';
import Field from '~/components/Field';
import Answers from '~/components/Answers';
import Link from 'next/link';

export function ProblemPageTemplate() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { data, error, isLoading } = useFetchProblemDetail(
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
            <Typography variant="h2" component="h2" sx={{ fontSize: '2em' }}>
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
            <Typography variant="h2" component="h2" sx={{ fontSize: '2em' }}>
                回答一覧
            </Typography>
            <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Answers
                    problemId={data.id}
                    maxPairCount={data.fieldSize * data.fieldSize}
                />
            </Box>
        </Container>
    );
}
