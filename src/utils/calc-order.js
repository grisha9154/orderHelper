const calcOrder = (params) => {
    const totalCost = params.reduce((agg, item) => { return item.cost + agg }, 0);
    const totalCostGoods = params.reduce((agg, item) => { return agg + (item.weight / 100) * item.costOfGoods}, 0);

    return { totalCost, totalCostGoods, freeMony: totalCost - totalCostGoods };
}

module.exports = calcOrder;
