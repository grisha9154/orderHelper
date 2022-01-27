import CostGoodsCRUD from "../../models/crud/cost-goodsCRUD";
import { roundCost } from "../../utils/round-cost";

export const execReadCostGoods = async () => {
    const costGoods = await CostGoodsCRUD.read();
    return costGoods.map(good => {
        return `${good.name} ${roundCost(good.cost)}р`;
    }).join('\n');
};
