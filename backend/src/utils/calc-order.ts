export interface OrderPayload {
    totalCost: number;
    totalCostGoods: number;
    freeMony: number;
}

export interface Param {
    cost: number;
    weight: number;
    costOfGoods: number;
}

export const calcOrder = (params: Param[]): OrderPayload => {
    const totalCost = params.reduce((agg: number, item) => { return item.cost + agg }, 0);
    const totalCostGoods = params.reduce((agg: number, item) => { return agg + (item.weight / 100) * item.costOfGoods}, 0);

    return { totalCost, totalCostGoods, freeMony: totalCost - totalCostGoods };
}
