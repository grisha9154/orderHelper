import { CostGoods } from "../../data-base/models/cost-goods";
import { mapCost } from "../../utils/map-const";

export interface Param {
    name: string;
    cost: string;
}

const mapParam = (param: Param): any => {
    const cost = mapCost(param.cost);
    return {
        name: param.name,
        cost: cost,
    };
}

export const execAddCostGoodsCommand = async (params: Param[]): Promise<string> => {
    Promise.all(params.map((param) => {
        const good = mapParam(param);
        return CostGoods.create(good);
    }));

    return `Добавлена себестоимость.`;
}
