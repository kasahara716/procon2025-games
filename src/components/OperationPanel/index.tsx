'use client';

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemText,
    Slider,
    Typography,
} from '@mui/material';
import { useMemo } from 'react';
type Props = {
    x: number;
    y: number;
    n: number;
    fieldSize: number;
    onNChange: (n: number) => void;
    onRotateClick: () => void;
};

export default function OperationPanel({
    x,
    y,
    n,
    fieldSize,
    onNChange,
    onRotateClick,
}: Props) {
    const handleChange = (event: Event, value: number) => {
        onNChange(value);
    };

    const marks = useMemo(() => {
        return Array(fieldSize - 1)
            .fill(0)
            .map((_, i) => {
                return { value: i + 2, label: i + 2 };
            });
    }, [fieldSize]);

    return (
        <Card>
            <CardHeader
                title={<Typography sx={{ fontSize: '1.2em' }}>操作</Typography>}
            />
            <CardContent>
                <Box>
                    <List>
                        <ListItem
                            secondaryAction={<Typography>{y}</Typography>}
                        >
                            <ListItemText>X</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem
                            secondaryAction={<Typography>{x}</Typography>}
                        >
                            <ListItemText>Y</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Slider
                                defaultValue={2}
                                value={n}
                                step={null}
                                min={2}
                                max={fieldSize}
                                onChange={handleChange}
                                getAriaValueText={(value) => `${value}回転`}
                                marks={marks}
                            />
                        </ListItem>
                    </List>

                    <Button variant="outlined" onClick={onRotateClick}>
                        回す！
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
