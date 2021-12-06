const calcOrder = require("../utils/calc-order");
const BaseCRUD = require("./base");

class OrderCRUD extends BaseCRUD {
    constructor(){
        super('orders');
    }

    create(params) {
        const date = Date(Date.now());
        const payload = calcOrder(params);
        super.create({ date, ...payload });
    }
}

module.exports = new OrderCRUD();