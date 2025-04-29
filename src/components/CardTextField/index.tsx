'use client';

import {
    Box,
    Card,
    CardContent,
    CardHeader,
    TextField,
    Typography,
} from '@mui/material';
type Props = {
    title: string;
    value: string;
    onChange?: (value: string) => void;
};

export default function CardTextField({ title, value, onChange }: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(event.target.value);
    };
    return (
        <Card>
            <CardHeader
                title={
                    <Typography sx={{ fontSize: '1.2em' }}>{title}</Typography>
                }
            />
            <CardContent>
                <Box>
                    <TextField
                        value={value}
                        variant="outlined"
                        multiline
                        rows={6}
                        sx={{ width: '100%' }}
                        onChange={handleChange}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}
