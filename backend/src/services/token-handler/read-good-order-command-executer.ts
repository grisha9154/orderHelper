import { GoodOrder } from "../../models/goods-orders";
import { Op } from "sequelize";
import { roundCost } from "../../utils/round-cost";
import { getDateFilter } from "../../utils/date-mapper";

export interface IReadGoodParam {
  name: string;
  from?: Date;
  to?: Date;
}

export const execReadGoodOrder = async (param: IReadGoodParam) => {
  const { firstDay, lastDay } = getDateFilter(param.from, param.to);
  const goodOrders = await GoodOrder.findAll({
    where: {
      name: {
        [Op.eq]: param.name,
      },
      createdAt: {
        [Op.gt]: firstDay,
        [Op.lt]: lastDay,
      },
    },
  });
  const freeMonyTotal = roundCost(
    goodOrders.reduce((agg, order) => {
      return agg + order.freeMony;
    }, 0)
  );

  const monyTotal = roundCost(
    goodOrders.reduce((agg, order) => {
      return agg + order.cost;
    }, 0)
  );

  const costOfGoodsTotal = roundCost(
    goodOrders.reduce((agg, order) => {
      return agg + order.costGoods;
    }, 0)
  );

  const weightTotal = roundCost(
    goodOrders.reduce((agg, order) => {
      return agg + order.weight;
    }, 0)
  );

  return `Оборот ${param.name}: ${monyTotal}р\nПрибыль за период: ${freeMonyTotal}р\nРасходы: ${costOfGoodsTotal}р\nОбщий вес: ${weightTotal}`;
};
