import {
    AppBar,
    Box,
    CssBaseline,
    ThemeProvider,
    Toolbar,
    Typography,
} from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import Analytics from '~/components/Analytics';
import theme from '~/theme';

export const metadata: Metadata = {
    title: 'プロコン2025',
    description: '',
};

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" className={roboto.variable}>
            <body>
                <Analytics />
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <AppBar>
                            <Toolbar>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: '2em',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        color: 'inherit',
                                    }}
                                    component={Link}
                                    href="/"
                                >
                                    高専プロコン2025
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                                mt: ['48px', '56px', '64px'],
                                p: 3,
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        >
                            {children}
                        </Box>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
