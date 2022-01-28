import CostGoodsCRUD from "../../models/crud/cost-goodsCRUD";
import { mapCost } from "../../utils/map-const";

export interface Param {
  name: string;
  cost: string;
}

const mapParam = (param: Param) => {
  const cost = mapCost(param.cost);
  return {
    name: param.name,
    cost: cost,
  };
};

const updateCostGoods = async (param: Param) => {
  const { name, cost } = mapParam(param);
  const goods = await CostGoodsCRUD.read();

  const good = goods.find((item) => item.name === name);

  if (!good) {
    throw new Error("Не существует такая сущность");
  }

  good.cost = cost ? cost : good.cost;

  CostGoodsCRUD.update(good);
};

export const execUpdateCostGoods = (params: Param[]) => {
  params.forEach(updateCostGoods);
  return "Обнавлено успешно";
};
