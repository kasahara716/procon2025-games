'use client';

import {
    Card as MuiCard,
    Container,
    Stack,
    styled,
    Typography,
    Box,
    FormControl,
    FormLabel,
    TextField,
    Button,
    IconButton,
    Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { FormEvent, useState } from 'react';
import { useSendUser } from '~/apis/users';
import Link from 'next/link';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignupContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((0.5 - var(--template-frame-height, 0)) * 100vh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignupPage() {
    const [nameErrorMessage, setNameErrorMessage] = useState<
        string | undefined
    >(undefined);
    const [secretErrorMessage, setSecretErrorMessage] = useState<
        string | undefined
    >(undefined);
    const [sendErrorMessage, setSendErrorMessage] = useState<
        string | undefined
    >(undefined);
    const [sendingResult, setSendingResult] = useState<
        { token: string } | undefined
    >(undefined);

    const { trigger, isMutating } = useSendUser();

    const validateInputs = () => {
        const name = document.getElementById('name') as HTMLInputElement;
        const secret = document.getElementById('secret') as HTMLInputElement;

        let isValid = true;

        if (!name.value || name.value.length < 1) {
            setNameErrorMessage('名前（ニックネーム）を入力してください');
            isValid = false;
        } else {
            setNameErrorMessage(undefined);
        }

        if (!secret.value || secret.value.length < 1) {
            setSecretErrorMessage('シークレットコードを入力してください');
            isValid = false;
        } else {
            setSecretErrorMessage(undefined);
        }

        return isValid;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        if (nameErrorMessage || secretErrorMessage) {
            event.preventDefault();
            return;
        }
        setSendErrorMessage(undefined);

        const data = new FormData(event.currentTarget);
        const result = await trigger({
            name: data.get('name') as string,
            secret: data.get('secret') as string,
            schoolName: data.get('schoolName') as string,
        });
        if ('statusCode' in result) {
            if (result.statusCode !== 201) {
                setSendErrorMessage('ユーザー登録に失敗しました');
                return false;
            }
        }
        setSendingResult({ token: result.token });
    };

    const handleCopyClick = () => {
        if (sendingResult?.token) {
            global.navigator.clipboard.writeText(sendingResult.token);
        }
    };

    return (
        <Container>
            <SignupContainer>
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: '100%',
                            fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                        }}
                    >
                        {sendingResult ? 'ユーザー登録完了' : 'ユーザー登録'}
                    </Typography>
                    {sendingResult && (
                        <>
                            <Alert>
                                各種APIなどの認証に必要なトークンは以下です。再発行は基本的に出来ませんので大切に保管してください
                            </Alert>
                            <Box sx={{ position: 'relative' }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    value={sendingResult.token}
                                    variant="outlined"
                                />
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        right: 0,
                                        bottom: 0,
                                        zIndex: 1,
                                    }}
                                    onClick={handleCopyClick}
                                >
                                    <ContentCopyIcon />
                                </IconButton>
                            </Box>
                            <Button
                                variant="contained"
                                href="/"
                                component={Link}
                            >
                                TOPに戻る
                            </Button>
                        </>
                    )}
                    {!sendingResult && (
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                            action={() => {}}
                        >
                            {sendErrorMessage && (
                                <Typography
                                    variant="body2"
                                    color="error"
                                    sx={{ textAlign: 'center' }}
                                >
                                    {sendErrorMessage}
                                </Typography>
                            )}
                            <Typography variant="body2">
                                proconXX.kasahara.devで使用する共通のユーザー登録です
                            </Typography>
                            <FormControl>
                                <FormLabel htmlFor="name">
                                    名前（ニックネーム）※公開されます
                                </FormLabel>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    placeholder=""
                                    error={!!nameErrorMessage}
                                    helperText={nameErrorMessage}
                                    color={
                                        nameErrorMessage ? 'error' : 'primary'
                                    }
                                    disabled={isMutating}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="secret">
                                    シークレットコード
                                </FormLabel>
                                <TextField
                                    required
                                    fullWidth
                                    id="secret"
                                    placeholder=""
                                    name="secret"
                                    variant="outlined"
                                    error={!!secretErrorMessage}
                                    helperText={secretErrorMessage}
                                    color={
                                        secretErrorMessage ? 'error' : 'primary'
                                    }
                                    disabled={isMutating}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="schoolName">
                                    学校名（任意）※公開される可能性があります
                                </FormLabel>
                                <TextField
                                    fullWidth
                                    id="schoolName"
                                    placeholder="XX高専"
                                    name="schoolName"
                                    variant="outlined"
                                    color="primary"
                                    disabled={isMutating}
                                />
                            </FormControl>
                            <Typography variant="body2">
                                このシステムではメールアドレスなどによる本人確認手段となるものを登録いただかない代わりにシークレットコード（パスワードのようなもの）を登録いただきます。忘れないようにメモしておいてください
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 'bold' }}
                            >
                                また、このあと表示されるTokenは基本的に再発行出来ませんので忘れずに保存してください
                            </Typography>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={validateInputs}
                                disabled={isMutating}
                            >
                                登録する
                            </Button>
                        </Box>
                    )}
                </Card>
            </SignupContainer>
        </Container>
    );
}
