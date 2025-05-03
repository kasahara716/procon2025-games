import { Container } from '@mui/material';
import Link from 'next/link';

type Props = {
    data: { problems: { id: number; title: string }[]; total: number };
};

export function TopPageTemplate({ data }: Props) {
    return (
        <Container>
            <Link href="/player">プレイヤー</Link>
            {data.problems.map((problem) => (
                <div key={problem.id}>
                    <Link href={`/problem?id=${problem.id}`}>
                        {problem.title}
                    </Link>
                </div>
            ))}
        </Container>
    );
}
