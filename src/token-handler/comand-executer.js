const TokenNames = require("../analyzer/tokens-name");
const execAddCostGoodsCommand = require("./add-cost-goods-command-executer");
const execOrderAddCommand = require("./add-order-command-executer");
const execCalcOrderCommand = require("./calc-order-command-executer");
const execReadCostGoods = require("./read-cost-goods-executer");

class CommandExecuter {
    _executors = {
        [`add_${TokenNames.entity_order}`]: execOrderAddCommand,
        [`add_${TokenNames.entity_costGoods}`]: execAddCostGoodsCommand,
        [`calc_${TokenNames.entity_order}`]: execCalcOrderCommand,
        [`read_${TokenNames.entity_costGoods}`]: execReadCostGoods,
    };

    exec(command) {
        const executer = this._getExecuter(command.name, command.entity.type);
        return executer(command.params);
    }

    _getExecuter(name, entity) {
        const executorName = `${name}_${entity}`;
        const executor = this._executors[executorName];
        if(!executor){
            console.error(`Invalid Executor name: ${executorName}`);
        } 
        return executor;
    }
}

module.exports = CommandExecuter;