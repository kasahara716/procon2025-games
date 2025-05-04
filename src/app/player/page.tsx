import { Suspense } from 'react';
import { PlayerPageTemplate } from '~/templates/PlayerPage';

export default function PlayerPage() {
    return (
        <Suspense>
            <PlayerPageTemplate />
        </Suspense>
    );
}
