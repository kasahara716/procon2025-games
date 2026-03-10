'use client';

import useSWR from 'swr';

const API_URL = '/data';

export type Problem = {
    id: number;
    title: string;
    fieldSize: number;
    createdAt: string;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useFetchProblems = () => {
    return useSWR<{ id: number; fieldSize: number; title: string }[]>(
        `${API_URL}/problems.json`,
        fetcher,
    );
};

export const useFetchProblem = (id?: number) => {
    return useSWR<{
        id: number;
        title: string;
        fieldSize: number;
        fieldEntities: number[][];
    }>(id ? `${API_URL}/problems/${id}.json` : undefined, fetcher);
};
