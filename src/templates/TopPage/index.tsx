'use client';

import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Container,
    Grid,
    Pagination,
    Stack,
    Typography,
} from '@mui/material';
import Link from 'next/link';
import { useFetchProblems } from '~/apis/problems';
import { TopPageLoading } from './loading';
import ProblemItem from '~/components/ProblemItem';
import { useRouter, useSearchParams } from 'next/navigation';

export function TopPageTemplate() {
    const searchParams = useSearchParams();
    const page = searchParams.get('page')
        ? Number(searchParams.get('page'))
        : 1;
    const { data, isLoading } = useFetchProblems(page);
    const router = useRouter();

    if (isLoading) {
        return <TopPageLoading />;
    }

    const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
        router.push(`/?page=${page}`);
    };

    return (
        <Container>
            <Alert variant="filled" severity="warning" sx={{ mb: 4 }}>
                <AlertTitle>重要なお知らせ</AlertTitle>
                9月16日までの本サイトでの回答提出にあたってX座標とY座標が逆になっていることが判明し修正いたしました。
                ご迷惑をおかけし、また混乱を生むような形となってしまい申し訳ございませんでした
            </Alert>
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
                {data?.problems.map(
                    (problem: {
                        title: string;
                        id: number;
                        fieldSize: number;
                    }) => <ProblemItem key={problem.id} problem={problem} />,
                )}
            </Stack>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Pagination
                    sx={{ display: 'inline-block' }}
                    count={Math.ceil((data?.totalCount || 1) / 20)}
                    defaultPage={page}
                    onChange={handleChangePage}
                />
            </Box>
        </Container>
    );
}
