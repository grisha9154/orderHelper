import { BaseCRUD } from "./base";
import { IBaseEntity } from "./base-entity";

export interface CostGoodsEntity extends IBaseEntity {
    cost: number;
}

export class CostGoods extends BaseCRUD<CostGoodsEntity> {
    public constructor(){
        super('costs');
    }
}

export default new CostGoods();