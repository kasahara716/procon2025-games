'use client';

import { useFetchProblems } from '~/apis/problems';
import { TopPageTemplate } from '~/templates/TopPage';
import { TopPageLoading } from '~/templates/TopPage/loading';

export default function TopPage() {
    const { data, error, isLoading } = useFetchProblems();

    if (isLoading) {
        return <TopPageLoading />;
    }

    return <TopPageTemplate data={data} />;
}
