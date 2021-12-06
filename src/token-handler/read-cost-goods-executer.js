const costGoodsCRUD = require("../crud/cost-goodsCRUD");

const execReadCostGoods = () => {
    const costGoods = costGoodsCRUD.read();
    return costGoods.map(good => {
        return `${good.name} ${good.cost}`;
    }).join('\n');
};

module.exports = execReadCostGoods;