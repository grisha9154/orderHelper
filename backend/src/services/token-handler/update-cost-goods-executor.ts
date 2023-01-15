import { CostGoods } from "../../models/cost-goods";
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
  const goods = await CostGoods.findAll();

  const good = goods.find((item) => item.name === name);

  if (!good) {
    throw new Error("Не существует такая сущность");
  }

  good.cost = cost ? cost : good.cost;

  return good.save();
};

export const execUpdateCostGoods = async (params: Param[]) => {
  await Promise.all(params.map(updateCostGoods));
  return "Обнавлено успешно";
};
