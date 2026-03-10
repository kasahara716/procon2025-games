'use client';

import useSWR from 'swr';

const API_URL = '/data';

export type Answer = {
    id: string;
    pairCount: number;
    operationCount: number;
    user: {
        name: string;
        handle: string;
    };
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useFetchAnswers = (id: number) => {
    return useSWR<Answer[]>(`${API_URL}/answers/${id}.json`, fetcher);
};
