'use client';

import {
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
            <Button variant="contained" component={Link} href="/player">
                手動プレイヤー
            </Button>
            <Typography variant="h4" component="h1" sx={{ mt: 4 }}>
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
