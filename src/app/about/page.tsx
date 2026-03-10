import { Box, Container, Typography } from '@mui/material';

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
                    2025年に開催された
                    <a href="https://www.procon.gr.jp/" target="_blank">
                        高専プロコン
                    </a>
                    の競技部門の競技練習場でした
                </Typography>
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
