import { Order } from '../../models/order';
import { roundCost } from "../../utils/round-cost";

export interface ICalcProfitParam {
    from?: Date;
    to?: Date;
}

export const execCalcProfitCommand = async (_param: any) => {
    const orders = await Order.findAll();

    const freeMonyTotal = roundCost(orders.reduce((agg, order) => {
        return agg + order.freeMony;
    },
    0));

    const monyTotal = roundCost(orders.reduce((agg, order) => {
        return agg + order.cost;
    },
    0));

    const costOfGoodsTotal = roundCost(orders.reduce((agg, order) => {
        return agg + order.costGoods;
    },
    0));

    return `Оборот: ${monyTotal}р\nПрибыль за период: ${freeMonyTotal}р\nРасходы: ${costOfGoodsTotal}р`;
};
