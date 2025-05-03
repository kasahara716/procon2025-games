import { Suspense } from 'react';
import { TopPageTemplate } from '~/templates/TopPage';

export default function TopPage() {
    return (
        <Suspense>
            <TopPageTemplate />
        </Suspense>
    );
}
