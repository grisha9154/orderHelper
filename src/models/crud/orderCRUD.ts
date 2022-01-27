import { BaseCRUD } from "./base";
import { IBaseEntity } from "./base-entity";

export interface OrderEntity extends IBaseEntity {
    cost: number;
    costGoods: number;
    freeMony: number;
    date: Date;
}

class OrderCRUD extends BaseCRUD<OrderEntity> {
    public constructor(){
        super('orders');
    }
}

export default new OrderCRUD();