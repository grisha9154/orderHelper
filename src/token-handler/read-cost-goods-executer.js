const costGoodsCRUD = require("../crud/cost-goodsCRUD");
const roundCost = require("../utils/round-cost");

const execReadCostGoods = () => {
    const costGoods = costGoodsCRUD.read();
    return costGoods.map(good => {
        return `${roundCost(good.name)} ${roundCost(good.cost)}р`;
    }).join('\n');
};

module.exports = execReadCostGoods;