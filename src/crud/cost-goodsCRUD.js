const BaseCRUD = require('./base');

class CostGoods extends BaseCRUD {
    constructor(){
        super('costs');
    }

    create(params) {
        params.forEach(element => {
            super.create(element);            
        });
    }
}

module.exports = new CostGoods();