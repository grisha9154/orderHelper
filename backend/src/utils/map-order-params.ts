import { CostGoods } from "../data-base/models/cost-goods";
import { mapCost } from "./map-const";
import { mapWeight } from "./map-weght";

export interface Param {
    name: string;
    weight: string;
    cost: string;
}

export const mapParams = async (params: Param[]): Promise<any> => {
    const weightMap: Record<string, number> = {};
    const costMap: Record<string, number> = {};
    const costGoodsMap: Record<string, number> = {};
    const freeMonyMap: Record<string, number> = {};
    const costGoods = await CostGoods.findAll();

    params.forEach((param) => {
        const { name, weight, cost } = param;
        const weightUnit = mapWeight(weight);
        const costUnit = mapCost(cost);
        const good = costGoods.filter((item) => item.name === name)[0];
        if (!good) {
            throw(new Error(`Не верное имя: ${name}`));
        }
        const costOfGoods = good.cost;
        const costOfGoodsTotal = (weightUnit / 100) * costOfGoods;
        const freeMony = costUnit - costOfGoodsTotal;

        weightMap[name] = weightMap[name] ? weightMap[name] + weightUnit : weightUnit;
        costMap[name] = costMap[name] ? costMap[name] + costUnit : costUnit;
        costGoodsMap[name] = costGoodsMap[name] ? costGoodsMap[name] + costOfGoodsTotal : costOfGoodsTotal;
        freeMonyMap[name] = freeMonyMap[name] ? freeMonyMap[name] + freeMony : freeMony;
    });

    return [{
        name: 'Order',
        date: new Date(Date.now()),
        cost: Object.values(costMap).reduce((agg, x) => agg + x, 0),
        costGoods: Object.values(costGoodsMap).reduce((agg, x) => agg + x, 0),
        freeMony: Object.values(freeMonyMap).reduce((agg, x) => agg + x, 0),
    }, weightMap, costMap, costGoodsMap, freeMonyMap]
};