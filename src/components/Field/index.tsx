'use client';

import { isPair, type FieldData } from '~/utils/game';

type Props = {
    field: FieldData;
    pairs?: { x: number; y: number }[];
    colorChangeArea?: { x: number; y: number; n: number };
    onCellClick?: (x: number, y: number) => void;
};

export default function Field({
    field,
    pairs,
    colorChangeArea,
    onCellClick,
}: Props) {
    const handleClick = (x: number, y: number) => {
        return () => {
            onCellClick && onCellClick(x, y);
        };
    };

    return (
        <>
            <table>
                {field.entities.map((row, x) => {
                    return (
                        <tr key={`${x}`}>
                            {row.map((col, y) => {
                                return (
                                    <td key={`${x}-${y}`}>
                                        <div
                                            style={{
                                                borderColor:
                                                    pairs &&
                                                    pairs.findIndex((p) => {
                                                        return (
                                                            p.x === x &&
                                                            p.y === y
                                                        );
                                                    }) !== -1
                                                        ? '#FF0000'
                                                        : '#000000',
                                                borderStyle: 'solid',
                                                borderWidth: '1px',
                                                width: 30,
                                                height: 30,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                backgroundColor:
                                                    colorChangeArea &&
                                                    colorChangeArea.x <= x &&
                                                    colorChangeArea.x +
                                                        colorChangeArea.n >
                                                        x &&
                                                    colorChangeArea.y <= y &&
                                                    colorChangeArea.y +
                                                        colorChangeArea.n >
                                                        y
                                                        ? '#c7f8ff'
                                                        : '#FFFFFF',
                                            }}
                                            onClick={handleClick(x, y)}
                                        >
                                            {col}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </table>
        </>
    );
}
