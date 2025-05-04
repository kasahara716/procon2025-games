'use client';

import useSWRMutation from 'swr/mutation';

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || 'https://proconapi.kasahara.dev';

const sendUser = async (
    url: string,
    { arg }: { arg: { name: string; secret: string; schoolName: string } },
) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(arg),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    }).then((res) => res.json());
};

export const useSendUser = () => {
    return useSWRMutation(`${API_URL}/users`, sendUser);
};
