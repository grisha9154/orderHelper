import { TokenNames } from "../analyzer/tokens-name";
import { execAddCostGoodsCommand } from "./add-cost-goods-command-executer";
import { execOrderAddCommand } from "./add-order-command-executer";
import { execCalcOrderCommand } from "./calc-order-command-executer";
import { execCalcProfitCommand, ICalcProfitParam } from "./calc-profit-command-executor";
import { Command } from "./command";
import { execReadCostGoods } from "./read-cost-goods-executer";
import { execUpdateCostGoods } from "./update-cost-goods-executor";
import { execRemoveCostOfGoods } from "./remove-cost-goods-command-executer";

class CommandExecuter<TParam> {
  private executors: Record<string, (params: any) => Promise<string>> = {
    [`add_${TokenNames.entity_order}`]: execOrderAddCommand,
    [`calc_${TokenNames.entity_order}`]: execCalcOrderCommand,
    [`add_${TokenNames.entity_costGoods}`]: execAddCostGoodsCommand,
    [`read_${TokenNames.entity_costGoods}`]: execReadCostGoods,
    [`update_${TokenNames.entity_costGoods}`]: execUpdateCostGoods,
    [`calc_${TokenNames.entity_profit}`]: execCalcProfitCommand,
    [`remove_${TokenNames.entity_costGoods}`]: execRemoveCostOfGoods,
  };

  public exec(command: Command<TParam[] | ICalcProfitParam | null>) {
    const executer = this.getExecuter(command.name, command.entity.type);
    return executer(command.params);
  }

  private getExecuter(name: string, entity: string) {
    const executorName = `${name}_${entity}`;
    const executor = this.executors[executorName];
    if (!executor) {
      console.error(`Invalid Executor name: ${executorName}`);
    }
    return executor;
  }
}

export default new CommandExecuter();
