import { Suspense } from 'react';
import { ProblemPageTemplate } from '~/templates/ProblemPage';

export default function ProblemPage() {
    return (
        <Suspense>
            <ProblemPageTemplate />
        </Suspense>
    );
}
