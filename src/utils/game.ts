/** フィールド情報 */
export type FieldData = {
    /** 縦横の長さ(偶数, 4以上24以下) */
    size: number;

    /** フィールドのデータ(0 - (size * size / 2) - 1の整数値が2つずつ存在する) */
    entities: number[][];
};

/** 操作情報 */
export type Operation = {
    /** X座標(横方向) */
    x: number;

    /** Y座標(縦方向) */
    y: number;

    /** 辺のサイズ */
    n: number;
};

/** フィールドが正常か確認 */
export const validateField = (field: FieldData): boolean => {
    // サイズが異なるときは無効
    if (field.size !== field.entities.length) return false;

    // フィールドのサイズが既定値の範囲内じゃない場合は無効
    if (field.size < 4 || field.size > 24) return false;

    // フィールドのサイズが偶数じゃない場合は無効
    if (field.size % 2 !== 0) return false;

    // フィールドに存在する最大値
    const maxValue = (field.size * field.size) / 2 - 1;

    // 値が出現する回数を数えるため
    const values = new Array(maxValue + 1).fill(0);

    for (let i = 0; i < field.size; i++) {
        // サイズが異なるときは無効
        if (field.entities[i].length !== field.size) return false;

        for (let j = 0; j < field.size; j++) {
            // 値が不正な場合は無効
            if (
                field.entities[i][j] < 0 ||
                field.entities[i][j] > maxValue ||
                !Number.isInteger(field.entities[i][j])
            ) {
                return false;
            }

            // 値が2つ以上存在する場合は無効
            if (values[field.entities[i][j]] > 1) {
                return false;
            }

            // 値の出現回数をカウントする
            values[field.entities[i][j]]++;
        }
    }

    if (values.findIndex((v) => v > 2) !== -1) return false;

    return true;
};

/** 操作が正常か確認 */
const validateOperation = (field: FieldData, ops: Operation): boolean => {
    // 操作する範囲の横幅がフィールドを超える
    if (field.size < ops.x + ops.n) return false;

    // 操作する範囲の縦幅がフィールドを超える
    if (field.size < ops.y + ops.n) return false;

    return true;
};

/** 該当する座標のブロックがペアになっているか確認する */
export const isPair = (field: FieldData, x: number, y: number): boolean => {
    // 左側が同じ数字か確認する
    if (x > 0 && field.entities[x][y] === field.entities[x - 1][y]) return true;

    // 右側が同じ数字か確認する
    if (x + 1 < field.size && field.entities[x][y] === field.entities[x + 1][y])
        return true;

    // 上が同じ数字か確認する
    if (y > 0 && field.entities[x][y] === field.entities[x][y - 1]) return true;

    // 下が同じ数字か確認する
    if (y + 1 < field.size && field.entities[x][y] === field.entities[x][y + 1])
        return true;

    return false;
};

/** 与えられたフィールド情報に対して回転操作を行う */
export const rotate = (field: FieldData, ops: Operation): FieldData => {
    const entities = structuredClone(field.entities);

    if (!validateOperation(field, ops)) {
        throw new Error('Invalid operation');
    }

    for (let i = 0; i < ops.n; i++) {
        for (let j = 0; j < ops.n; j++) {
            entities[ops.y + i][ops.x + j] =
                field.entities[ops.y + ops.n - 1 - j][ops.x + i];
        }
    }

    return { size: field.size, entities };
};
