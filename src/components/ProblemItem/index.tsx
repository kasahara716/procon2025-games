'use client';

import { Box, Grid, Paper } from '@mui/material';

type Props = {
    problem: { id: number; title: string; fieldSize: number };
};

export default function ProblemItem({ problem }: Props) {
    return (
        <a
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
        </a>
    );
}
