import { Container } from '@mui/material';
import Link from 'next/link';

export default function Home() {
    return (
        <Container>
            <div>
                <Link href="/player">プレイヤー</Link>
            </div>
        </Container>
    );
}
