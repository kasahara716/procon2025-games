import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useSendAnswer } from '~/apis/answers';

type Props = { problemId: number };

export default function AnswerSender({ problemId }: Props) {
    const [result, setResult] = useState<
        | {
              id: string;
              problemId: string;
              resultFields: number[][];
              operations: { ops: { x: number; y: number; n: number }[] };
              pairCount: number;
              operationCount: number;
          }
        | undefined
    >(undefined);
    const [error, setError] = useState<
        { statusCode: number; error: string; message: string } | undefined
    >(undefined);

    const { trigger, isMutating } = useSendAnswer(problemId);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const token = formData.get('token') as string;
        const answer = formData.get('answer') as string;

        setResult(undefined);
        setError(undefined);

        const result = await trigger({ token, answer });

        if ('statusCode' in result) {
            if (result.statusCode !== 201) {
                setError(result);
            }
        } else {
            setResult(result);
        }
    };

    return (
        <>
            {result && (
                <Alert sx={{ mb: 2 }} severity="info">
                    <Typography>解答が送信できました</Typography>
                    <Typography>ペア数：{result.pairCount}</Typography>
                    <Typography>操作数：{result.operationCount}</Typography>
                </Alert>
            )}
            {error && (
                <Alert sx={{ mb: 2 }} severity="error">
                    <Typography>{error.error}</Typography>
                    <Typography>{error.message}</Typography>
                </Alert>
            )}
            <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
                <Box>
                    <TextField
                        name="token"
                        required
                        label="Token"
                        sx={{ mb: 2, width: { xs: '100%', md: '50%' } }}
                        disabled={isMutating}
                    ></TextField>
                </Box>
                <Box>
                    <TextField
                        name="answer"
                        multiline
                        label="解答"
                        rows={4}
                        sx={{ width: '100%', mb: 2 }}
                        disabled={isMutating}
                    ></TextField>
                </Box>
                <Button type="submit" variant="contained" disabled={isMutating}>
                    解答を送信する
                </Button>
            </Box>
        </>
    );
}
