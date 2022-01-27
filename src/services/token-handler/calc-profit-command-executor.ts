import orderCRUD from "../../models/crud/orderCRUD";
import { roundCost } from "../../utils/round-cost";

export interface ICalcProfitParam {
    from?: Date;
    to?: Date;
}

export const execCalcProfitCommand = (_param): string => {
    const orders = orderCRUD.read();

    // const freeMonyTotal = orders.reduce((agg, order) => {
    //     return agg + order.freeMony;
    // },
    // 0);
    const freeMonyTotal = 0;

    return `Прибыль за период: ${roundCost(freeMonyTotal)}р`;
};
