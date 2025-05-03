'use client';

import useSWR from 'swr';

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || 'https://proconapi.kasahara.dev';

export type Answer = {
    id: string;
    pairCount: number;
    operationCount: number;
    user: {
        id: string;
        name: string;
    };
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useFetchAnswers = (id: number, offset: number = 0) => {
    return useSWR<{
        answers: Answer[];
        totalCount: number;
    }>(
        `${API_URL}/procon2025/answers?problemId=${id}&offset=${offset}&sort=ranking`,
        fetcher,
    );
};
