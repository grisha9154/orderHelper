const CostGoods = require('../crud/cost-goodsCRUD');
const Utils = require('../utils');

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

const execAddCostGoodsCommand = (params) => {
    const mappedParams = params.map(mapParam);
    CostGoods.create(mappedParams);
    return `Добавлена себестоимость.`;
}

module.exports = execAddCostGoodsCommand;