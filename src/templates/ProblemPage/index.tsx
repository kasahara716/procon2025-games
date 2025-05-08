'use client';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Container,
    Divider,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearchParams } from 'next/navigation';
import { useFetchProblemDetail } from '~/apis/problems';
import { ProblemPageLoading } from './loading';
import Field from '~/components/Field';
import Answers from '~/components/Answers';
import Link from 'next/link';
import { Suspense } from 'react';
import AnswerSender from '~/components/AnswerSender';

export function ProblemPageTemplate() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const page = searchParams.get('page')
        ? Number(searchParams.get('page'))
        : 1;
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
            <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>解答をブラウザで送信する</Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                        <AnswerSender problemId={data.id} />
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Typography variant="h4" component="h2">
                解答一覧
            </Typography>
            <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Suspense>
                    <Answers
                        problemId={data.id}
                        maxPairCount={data.fieldSize * data.fieldSize}
                        page={page}
                    />
                </Suspense>
            </Box>
        </Container>
    );
}
