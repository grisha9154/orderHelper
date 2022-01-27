import CostGoodsCRUD, { CostGoodsEntity } from "../../models/crud/cost-goodsCRUD";
import { mapCost } from "../../utils/map-const";

export interface Param {
    name: string;
    cost: string;
}

const mapParam = (param: Param): CostGoodsEntity => {
    const cost = mapCost(param.cost);
    return {
        name: param.name,
        cost: cost,
    };
}

export const execAddCostGoodsCommand = (params: Param[]): string => {
    params.forEach((param) => {
        const good = mapParam(param);
        CostGoodsCRUD.create(good);
    });

    return `Добавлена себестоимость.`;
}
