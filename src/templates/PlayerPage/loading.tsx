import { Container, Skeleton } from '@mui/material';

export function PlayerPageLoading() {
    return (
        <Container>
            <Skeleton variant="rectangular" width="100%" height={50} />
        </Container>
    );
}
