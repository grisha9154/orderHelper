import { Order } from '../../models/order';
import { roundCost } from "../../utils/round-cost";

export interface ICalcProfitParam {
    from?: Date;
    to?: Date;
}

export const execCalcProfitCommand = async (_param: any) => {
    const orders = await Order.findAll();

    const freeMonyTotal = orders.reduce((agg, order) => {
        return agg + order.freeMony;
    },
    0);

    return `Прибыль за период: ${roundCost(freeMonyTotal)}р`;
};
