import OrderCRUD from "../crud/orderCRUD";
import { roundCost } from "../utils/round-cost";
import { mapParams, Param } from "../utils/map-order-params";

export const execOrderAddCommand = async (params: Param[]) => {
    const orderEntity = mapParams(params);
    // await OrderCRUD.create(orderEntity);
    // return `Добавлен заказ.\nСтоимость заказа ${roundCost(orderEntity.cost)}р\nСебестоимость ${roundCost(orderEntity.costGoods)}р.\nПрибыль ${roundCost(orderEntity.freeMony)}р`;
};
