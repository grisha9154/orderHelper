const costGoodsCRUD = require('../crud/cost-goodsCRUD');
const OrderCRUD = require('../crud/orderCRUD');
const Utils = require('../utils');
const roundCost = require('../utils/round-cost');

const mapWeight = (weightText) => {
    const match = weightText.match(Utils.weightRegex);
    const { unit, count } = match.groups;
    if (unit === 'кг'){
        return Number(count.replace(/,/g, '.')) * 1000;
    } else {
        return Number(count.replace(/,/g, '.'));
    }
};

const mapCost = (costText) => {
    const match = costText.match(Utils.costRegex);
    const { count } = match.groups;
    return Number(count.replace(/,/g, '.'));
}

const mapParam = (param) => {
    const weight = mapWeight(param.weight);
    const cost = mapCost(param.cost);
    const costGoods = costGoodsCRUD.read();
    const costOfGoods = costGoods.filter((item) => item.name === param.name)[0].cost;

    return {
        name: param.name,
        weight,
        cost,
        costOfGoods,
    }
};

const execAddOrderCommand = (params) => {
    const mappedParams = params.map(mapParam);
    OrderCRUD.create(mappedParams);
    const lastOrder = OrderCRUD.read().pop();
    return `Добавлен заказ.\nСтоимость заказа ${roundCost(lastOrder.totalCost)}р\nСебестоимость ${roundCost(lastOrder.totalCostGoods)}р.\nПрибыль ${roundCost(lastOrder.freeMony)}р`;
};

module.exports = execAddOrderCommand;
