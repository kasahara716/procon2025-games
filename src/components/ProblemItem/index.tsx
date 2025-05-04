'use client';

import { Box, Grid, Paper } from '@mui/material';
import Link from 'next/link';

type Props = {
    problem: { id: number; title: string; fieldSize: number };
};

export default function ProblemItem({ problem }: Props) {
    return (
        <Link
            href={`/problem?id=${problem.id}`}
            style={{ textDecoration: 'none' }}
        >
            <Paper>
                <Grid container sx={{ p: 2 }}>
                    <Grid size={1}>
                        <Box>{problem.id}</Box>
                    </Grid>
                    <Grid size={9}>{problem.title}</Grid>
                    <Grid size={2} sx={{ textAlign: 'center' }}>
                        {problem.fieldSize}
                    </Grid>
                </Grid>
            </Paper>
        </Link>
    );
}
