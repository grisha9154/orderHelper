import { roundCost } from "../../utils/round-cost";
import { mapParams, Param } from "../../utils/map-order-params";
import { Order } from "../../data-base/models/order";

export const execOrderAddCommand = async (params: Param[]) => {
    const orderEntity = await mapParams(params);
    await Order.create(orderEntity);
    return `Добавлен заказ.\nСтоимость заказа ${roundCost(orderEntity.cost)}р\nСебестоимость ${roundCost(orderEntity.costGoods)}р.\nПрибыль ${roundCost(orderEntity.freeMony)}р`;
};
