'use client';

import { Button, Container, Grid, Stack, Typography } from '@mui/material';
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
            <Button
                variant="contained"
                component={Link}
                href="/player"
                sx={{ mb: 4 }}
            >
                手動プレイヤー
            </Button>
            <Typography variant="h4" component="h1">
                問題一覧
            </Typography>
            <Stack spacing={2}>
                <Grid container spacing={2}>
                    <Grid size={1} sx={{ textAlign: 'center' }}>
                        ID
                    </Grid>
                    <Grid size={9} sx={{ textAlign: 'center' }}>
                        タイトル
                    </Grid>
                    <Grid size={2} sx={{ textAlign: 'center' }}>
                        サイズ
                    </Grid>
                </Grid>
                {data?.map(
                    (problem: {
                        title: string;
                        id: number;
                        fieldSize: number;
                    }) => (
                        <ProblemItem key={problem.id} problem={problem} />
                    ),
                )}
            </Stack>
        </Container>
    );
}
