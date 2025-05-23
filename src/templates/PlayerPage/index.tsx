'use client';

import { Container, Grid } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useFetchProblem } from '~/apis/problems';
import { PlayerPageLoading } from './loading';
import { FieldData, isPair, rotate, validateField } from '~/utils/game';
import CardTextField from '~/components/CardTextField';
import { useEffect, useState } from 'react';
import Field from '~/components/Field';
import OperationPanel from '~/components/OperationPanel';
import Score from '~/components/Score';

// サンプルフィールド情報
const DEFAULT_FIELD: FieldData = {
    size: 4,
    entities: [
        [6, 3, 4, 0],
        [1, 5, 3, 5],
        [2, 7, 0, 6],
        [1, 2, 7, 4],
    ],
};

export function PlayerPageTemplate() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { data, isLoading } = useFetchProblem(
        id ? parseInt(id, 10) : undefined,
    );

    const [fieldRowData, setFieldRowData] = useState(
        JSON.stringify(DEFAULT_FIELD),
    );
    const [field, setField] = useState<FieldData>(DEFAULT_FIELD);
    const [pairs, setPairs] = useState<{ x: number; y: number }[]>([]);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [n, setN] = useState(2);
    const [operations, setOperations] = useState<
        { x: number; y: number; n: number }[]
    >([]);

    useEffect(() => {
        if (data) {
            setFieldRowData(JSON.stringify(data.problem.field));
            setField(data.problem.field);
        }
    }, [data]);

    const handleFieldChange = (value: string) => {
        setFieldRowData(value);

        try {
            const newField = JSON.parse(value) as FieldData;
            if (validateField(newField)) {
                setField(newField);

                setPairs([]);
                setX(0);
                setY(0);
                setN(2);
                setOperations([]);
            }
        } catch {}
    };

    const handleCellClick = (x: number, y: number) => {
        setX(x);
        setY(y);
    };

    const handleRotateClick = () => {
        const newField = rotate(field, { x, y, n });
        setField(newField);
        const newPairs: { x: number; y: number }[] = [];
        newField.entities.forEach((row, y) => {
            row.forEach((_, x) => {
                if (isPair(newField, x, y)) {
                    newPairs.push({ x, y });
                }
            });
        });
        setPairs(newPairs);
        setOperations(operations.concat({ x, y, n }));
    };

    if (isLoading) {
        return <PlayerPageLoading />;
    }

    return (
        <Container>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <CardTextField
                        title="フィールド情報"
                        value={fieldRowData}
                        onChange={handleFieldChange}
                    />
                </Grid>
                <Grid size={12} sx={{ overflowX: 'auto' }}>
                    <Field
                        field={field}
                        pairs={pairs}
                        onCellClick={handleCellClick}
                        colorChangeArea={{ x, y, n }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <OperationPanel
                        x={x}
                        y={y}
                        n={n}
                        fieldSize={field.size}
                        onNChange={setN}
                        onRotateClick={handleRotateClick}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Score
                        field={field}
                        pairs={pairs}
                        operationCount={operations.length}
                    />
                </Grid>
                <Grid size={12}>
                    <CardTextField
                        title="操作履歴"
                        value={JSON.stringify({ ops: operations })}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
