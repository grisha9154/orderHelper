import { OrderEntity } from "../models/crud/orderCRUD";
import { mapCost } from "./map-const";
import { mapWeight } from "./map-weght";
import CostGoodsCRUD from "../models/crud/cost-goodsCRUD";

export interface Param {
    name: string;
    weight: string;
    cost: string;
}

export const mapParams = async (params: Param[]): Promise<OrderEntity> => {
    const weightMap: Record<string, number> = {};
    const costMap: Record<string, number> = {};
    const costGoodsMap: Record<string, number> = {};
    const freeMonyMap: Record<string, number> = {};
    const costGoods = await CostGoodsCRUD.read();

    params.forEach((param) => {
        const { name, weight, cost } = param;
        const weightUnit = mapWeight(weight);
        const costUnit = mapCost(cost);
        const costOfGoods = costGoods.filter((item) => item.name === name)[0].cost;
        const costOfGoodsTotal = (weightUnit / 100) * costOfGoods;
        const freeMony = costUnit - costOfGoodsTotal;
        console.log(`Free mony: ${freeMony}`);

        weightMap[name] = weightMap[name] ? weightMap[name] + weightUnit : weightUnit;
        costMap[name] = costMap[name] ? costMap[name] + costUnit : costUnit;
        costGoodsMap[name] = costGoodsMap[name] ? costGoodsMap[name] + costOfGoodsTotal : costOfGoodsTotal;
        freeMonyMap[name] = freeMonyMap[name] ? freeMonyMap[name] + freeMony : freeMony;
    });

    return {
        name: 'Order',
        date: new Date(Date.now()),
        cost: Object.values(costMap).reduce((agg, x) => agg + x, 0),
        costGoods: Object.values(costGoodsMap).reduce((agg, x) => agg + x, 0),
        freeMony: Object.values(freeMonyMap).reduce((agg, x) => agg + x, 0),
    }
};