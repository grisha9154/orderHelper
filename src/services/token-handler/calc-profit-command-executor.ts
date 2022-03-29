import { Order } from '../../data-base/models/order';
import { roundCost } from "../../utils/round-cost";
import { Op } from "sequelize"; 

export interface ICalcProfitParam {
    from?: Date;
    to?: Date;
}

export const execCalcProfitCommand = async (_param: any) => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const orders = await Order.findAll({
        where: {
            createdAt: {
                [Op.gt]: firstDay,
                [Op.lt]: lastDay,
            }
        }
    });

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
