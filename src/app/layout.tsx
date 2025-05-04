'use client';

import {
    AppBar,
    Box,
    Button,
    Container,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ThemeProvider,
    Toolbar,
    Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import Analytics from '~/components/Analytics';
import theme from '~/theme';
import { useState } from 'react';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});

const navItems = [{ text: 'このサイトについて', href: '/about' }];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <List>
                {navItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            sx={{ textAlign: 'center' }}
                            href={item.href}
                            component={Link}
                        >
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <html lang="ja" className={roboto.variable}>
            <head>
                <title>高専プロコン2025</title>
            </head>
            <body>
                <Analytics />
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <AppBar>
                            <Container maxWidth="xl">
                                <Toolbar disableGutters>
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: '2em',
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                            color: 'inherit',
                                            flexGrow: 0,
                                        }}
                                        component={Link}
                                        href="/"
                                    >
                                        高専プロコン2025
                                    </Typography>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Box
                                        sx={{
                                            flexGrow: 0,
                                            display: { xs: 'flex', sm: 'none' },
                                        }}
                                    >
                                        <IconButton
                                            color="inherit"
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleDrawerToggle}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                    </Box>
                                    <Box
                                        sx={{
                                            flexGrow: 0,
                                            display: { xs: 'none', sm: 'flex' },
                                        }}
                                    >
                                        {navItems.map((item, index) => (
                                            <Button
                                                key={index}
                                                component={Link}
                                                href={item.href}
                                                sx={{
                                                    my: 2,
                                                    color: 'white',
                                                    display: 'block',
                                                }}
                                            >
                                                {item.text}
                                            </Button>
                                        ))}
                                    </Box>
                                </Toolbar>
                            </Container>
                        </AppBar>
                        <nav>
                            <Drawer
                                anchor="right"
                                variant="temporary"
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                sx={{
                                    display: { xs: 'block', sm: 'none' },
                                    '& .MuiDrawer-paper': {
                                        boxSizing: 'border-box',
                                        width: '200px',
                                    },
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </nav>
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
