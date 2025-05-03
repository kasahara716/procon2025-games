'use client';

import { useSearchParams } from 'next/navigation';
import { useFetchProblem } from '~/apis/problems';
import { ProblemPageTemplate } from '~/templates/ProblemPage';
import { ProblemPageLoading } from '~/templates/ProblemPage/loading';

export default function ProblemPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    if (!id) {
        return 'Error';
    }
    const { data, error, isLoading } = useFetchProblem(parseInt(id, 10));
    if (isLoading) {
        return <ProblemPageLoading />;
    }

    return <ProblemPageTemplate data={data} />;
}
