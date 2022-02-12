
import { CostGoods } from "../../models/cost-goods";
import { roundCost } from "../../utils/round-cost";

export const execReadCostGoods = async () => {
    const costGoods = await CostGoods.findAll();
    return costGoods.map(good => {
        return `${good.name} ${roundCost(good.cost)}р`;
    }).join('\n');
};
