'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || 'https://proconapi.kasahara.dev';

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

export const useFetchAnswers = (id: number, offset: number = 0) => {
    return useSWR<{
        answers: Answer[];
        totalCount: number;
    }>(
        `${API_URL}/procon2025/answers?problemId=${id}&offset=${offset}&sort=ranking&limit=20`,
        fetcher,
    );
};

const sendAnser = async (
    url: string,
    {
        arg,
    }: {
        arg: {
            token: string;
            /** JSON文字列 */
            answer: string;
        };
    },
) => {
    return fetch(url, {
        method: 'POST',
        body: arg.answer,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${arg.token}`,
        },
    }).then((res) => res.json());
};

export const useSendAnswer = (problemId: number) => {
    return useSWRMutation(
        `${API_URL}/procon2025/answers/${problemId}`,
        sendAnser,
    );
};
