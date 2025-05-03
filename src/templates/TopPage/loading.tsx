import { Container, Skeleton } from '@mui/material';

export function TopPageLoading() {
    return (
        <Container>
            <Skeleton variant="rectangular" width="100%" height={50} />
        </Container>
    );
}
