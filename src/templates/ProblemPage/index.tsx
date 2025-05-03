import { Container } from '@mui/material';

type Props = {
    data: { id: number; title: string };
};

export function ProblemPageTemplate({ data }: Props) {
    return (
        <Container>
            {data.id} {data.title}
        </Container>
    );
}
