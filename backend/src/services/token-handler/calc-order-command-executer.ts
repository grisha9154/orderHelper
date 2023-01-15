import { mapParams, Param } from "../../utils/map-order-params";
import { roundCost } from "../../utils/round-cost";

export const execCalcOrderCommand = async (params: Param[]) => {
    const [order] = await mapParams(params);
    return `Стоимость заказа ${roundCost(order.cost)}р\nСебестоимость ${roundCost(order.costGoods)}р.\nПрибыль ${roundCost(order.freeMony)}р`;
}
