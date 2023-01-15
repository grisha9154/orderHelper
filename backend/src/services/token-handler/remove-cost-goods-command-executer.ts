import { CostGoods } from "../../models/cost-goods";

interface Param {
  name: string;
}

export const execRemoveCostOfGoods = async (
  params: Param[]
): Promise<string> => {
  try {
    await Promise.all(
      params.map(async (param) => {
        const costGood = await CostGoods.findOne({
          where: {
            name: param.name,
          },
        });
        if (costGood) {
          await costGood.destroy();
        }
      })
    );
  } catch (e) {
    return "Упс, что то пошло не так";
  }

  return `Себестоимость удалена.`;
};
