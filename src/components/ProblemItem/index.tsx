'use client';

import { Box, Grid, Paper } from '@mui/material';
import Link from 'next/link';

type Props = {
    problem: { id: number; title: string };
};

export default function ProblemItem({ problem }: Props) {
    return (
        <Link href={`/problem?id=${problem.id}`}>
            <Paper>
                <Grid container sx={{ p: 2 }}>
                    <Grid size={1}>
                        <Box>{problem.id}</Box>
                    </Grid>
                    <Grid size={11}>{problem.title}</Grid>
                </Grid>
            </Paper>
        </Link>
    );
}
