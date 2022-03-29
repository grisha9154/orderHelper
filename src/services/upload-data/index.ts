import { CostGoods } from "../../data-base/models/cost-goods";
import { Order } from "../../data-base/models/order";

export const uploadData = async (cost: any[], orders: any[]) => {
    await Order.bulkCreate(orders);
    await CostGoods.bulkCreate(cost);
};
