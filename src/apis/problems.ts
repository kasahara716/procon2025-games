'use client';

import useSWR from 'swr';
import { FieldData } from '~/utils/game';

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || 'https://proconapi.kasahara.dev';

export type Problem = {
    id: number;
    title: string;
    fieldSize: number;
    createdAt: string;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useFetchProblems = (page: number = 1) => {
    return useSWR(
        `${API_URL}/procon2025/problems?limit=20&offset=${(page - 1) * 20}`,
        fetcher,
    );
};

export const useFetchProblemDetail = (id?: number) => {
    return useSWR<{
        id: number;
        title: string;
        fieldSize: number;
        fieldEntities: number[][];
    }>(id ? `${API_URL}/procon2025/problems/${id}/detail` : undefined, fetcher);
};

export const useFetchProblem = (id?: number) => {
    return useSWR<{
        startsAt: string;
        problem: {
            field: FieldData;
        };
    }>(id ? `${API_URL}/procon2025/problems/${id}` : undefined, fetcher);
};
