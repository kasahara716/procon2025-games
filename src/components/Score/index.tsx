'use client';

import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import { type FieldData } from '~/utils/game';

type Props = {
    field: FieldData;
    operationCount: number;
    pairs: { x: number; y: number }[];
};

export default function Score({ field, operationCount, pairs }: Props) {
    return (
        <Card>
            <CardHeader
                title={
                    <Typography sx={{ fontSize: '1.2em' }}>Score</Typography>
                }
            />
            <CardContent>
                <Box>
                    <List>
                        <ListItem
                            secondaryAction={
                                <Typography>
                                    {pairs.length} / {field.size * field.size}
                                </Typography>
                            }
                        >
                            <ListItemText>ペアポイント</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem
                            secondaryAction={
                                <Typography>{operationCount}</Typography>
                            }
                        >
                            <ListItemText>回数</ListItemText>
                        </ListItem>
                    </List>
                </Box>
            </CardContent>
        </Card>
    );
}
