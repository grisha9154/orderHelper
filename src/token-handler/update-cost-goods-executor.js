const costGoodsCRUD = require("../crud/cost-goodsCRUD");
const Utils = require("../utils");

const mapCost = (costText) => {
    const match = costText.match(Utils.costRegex);
    const { count } = match.groups;
    return Number(count.replace(/,/g, '.'));
}

const mapParam = (param) => {
    const cost = mapCost(param.cost);
    return {
        name: param.name,
        cost: cost,
    };
}

const execUpdateCostGoods = (params) => {
    const { name, cost } = mapParam(params[0]);
    const goods = costGoodsCRUD.read();

    const good = goods.find(item => item.name === name);
    good.cost = cost ? cost : good.cost;

    costGoodsCRUD.update(good);
    return 'Обнавлено успешно';
};

module.exports = execUpdateCostGoods;
