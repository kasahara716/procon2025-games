import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Container,
    Divider,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <Container>
            <Box sx={{ pb: 2 }}>
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{ fontSize: '2em' }}
                >
                    このサイトについて
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontSize: '1.1em' }}
                >
                    2025年に開催される
                    <a href="https://www.procon.gr.jp/" target="_blank">
                        高専プロコン
                    </a>
                    の競技部門の競技練習場です
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontSize: '1.1em' }}
                >
                    競技部門本選より前に切磋琢磨することでより良い結果を目指せるようにという思いを込めて作成しました。
                </Typography>
            </Box>
            <Box sx={{ pb: 2 }}>
                <Typography
                    variant="h2"
                    component="h2"
                    sx={{ fontSize: '1.5em' }}
                >
                    問題を提供したい場合
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontSize: '1.1em' }}
                >
                    <a
                        href="https://forms.gle/FXiQbSbfgkzJir3PA"
                        target="_blank"
                    >
                        こちらのGoogleForm
                    </a>
                    から問題を送信いただければ確認の上問題を追加します
                </Typography>
            </Box>

            <Box sx={{ pb: 2 }}>
                <Typography
                    variant="h2"
                    component="h2"
                    sx={{ fontSize: '1.5em' }}
                >
                    使い方（API経由で解答を送信する）
                </Typography>
                <Alert severity="info" sx={{ m: 2 }}>
                    各エンドポイントにはIPアドレスをベースにしたレート制限があります。学校などのNAT環境下ではRateLimitに頻繁に引っかかる可能性がありますがその際は運営サイドまでご連絡ください
                </Alert>
                <ol>
                    <Typography
                        variant="body1"
                        component="li"
                        sx={{ fontSize: '1.1em', pb: 2 }}
                    >
                        <Link href="/signup">ユーザー登録</Link>
                        で解答送信に必要なTokenを取得します
                    </Typography>
                    <Typography
                        variant="body1"
                        component="li"
                        sx={{ fontSize: '1.1em', pb: 2 }}
                    >
                        Tokenを取得したら以下のAPIを利用して問題を取得します
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>
                                    GET /procon2025/problems/{'{id}'}
                                </Typography>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>
                                <Box
                                    sx={{
                                        backgroundColor: '#333333',
                                        color: '#FFFFFF',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                    component="pre"
                                >
                                    {'>'} curl
                                    https://proconapi.kasahara.dev/procon2025/problems/1
                                    {'\n'}
                                    {'\n'}
                                    {
                                        '{"startsAt":1746346766140,"problem":{"field":{"size":4,"entities":[[6,3,4,0],[1,5,3,5],[2,7,0,6],[1,2,7,4]]}}}'
                                    }
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Typography>
                    <Typography
                        variant="body1"
                        component="li"
                        sx={{ fontSize: '1.1em', pb: 2 }}
                    >
                        問題が解き終わったら以下のAPIを利用して解答を送信します
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>
                                    POST /procon2025/answers/{'{problemId}'}
                                </Typography>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>
                                <Typography component="p">
                                    AuthorizationヘッダにBearer
                                    [token]の形式で送ってください
                                </Typography>
                                <Box
                                    sx={{
                                        backgroundColor: '#333333',
                                        color: '#FFFFFF',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                    component="pre"
                                >
                                    {'>'} curl -X POST
                                    https://proconapi.kasahara.dev/procon2025/answers/1
                                    -H &apos;Content-Type:
                                    application/json&apos; -H
                                    &apos;Authorization: Bearer [token]&apos; -d
                                    &apos;
                                    {'{"ops": [{"x": 0, "y": 0, "n": 2}]}'}
                                    &apos;
                                    {'\n'}
                                    {'\n'}
                                    {
                                        '{"id":"XXXX","problemId":1,"resultFields":[[1,6,4,0],[5,3,3,5],[2,7,0,6],[1,2,7,4]],"operations":{"ops":[{"x":0,"y":0,"n":2}]},"pairCount":2,"operationCount":1}'
                                    }
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Typography>
                </ol>
            </Box>

            <Box sx={{ pb: 2 }}>
                <Typography
                    variant="h2"
                    component="h2"
                    sx={{ fontSize: '1.5em' }}
                >
                    データの取扱について
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontSize: '1.1em' }}
                >
                    運営者は釧路高専のOBですが、お送りいただいた解答データ（操作手順）は一切誰にも開示しませんのでご安心ください。
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontSize: '1.1em' }}
                >
                    また、当サイトではGoogle
                    Analyticsによるアクセス解析を行っています。こちらも個人を特定できる情報は一切収集しませんのでご安心ください。
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontSize: '1.1em' }}
                >
                    ただ、個人運営のためデータ消失やサービス停止の可能性はありますので、あくまで自己責任でご利用ください。
                </Typography>
            </Box>
            <Box sx={{ pb: 2 }}>
                <Typography
                    variant="h2"
                    component="h2"
                    sx={{ fontSize: '1.5em' }}
                >
                    運営者
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontSize: '1.1em' }}
                >
                    <a href="https://x.com/kasahara716" target="_blank">
                        @kasahara716
                    </a>
                </Typography>
            </Box>
        </Container>
    );
}
