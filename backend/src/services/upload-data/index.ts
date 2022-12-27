import { CostGoods } from "../../models/cost-goods";
import { Order } from "../../models/order";

export const uploadData = async (cost: any[], orders: any[]) => {
    await Order.bulkCreate(orders);
    await CostGoods.bulkCreate(cost);
};
