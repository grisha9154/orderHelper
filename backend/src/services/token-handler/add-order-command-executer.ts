import { roundCost } from "../../utils/round-cost";
import { mapParams, Param } from "../../utils/map-order-params";
import { Order } from "../../models/order";
import { GoodOrder } from "../../models/goods-orders";

export const execOrderAddCommand = async (params: Param[]) => {
    const [orderEntity, weightMap, costMap, costGoodsMap, freeMonyMap] = await mapParams(params);
    const promises: Array<Promise<any>> = [Order.create(orderEntity)]
    for(const name of Object.keys(weightMap)) {
        promises.push(GoodOrder.create({
            name,
            weight: weightMap[name],
            cost: costMap[name],
            costGoods: costGoodsMap[name],
            freeMony: freeMonyMap[name],
        }));
    }
    await Promise.all(promises);
    return `Добавлен заказ.\nСтоимость заказа ${roundCost(orderEntity.cost)}р\nСебестоимость ${roundCost(orderEntity.costGoods)}р.\nПрибыль ${roundCost(orderEntity.freeMony)}р`;
};
