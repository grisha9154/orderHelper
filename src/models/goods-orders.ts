import { DataTypes, Model } from 'sequelize';
import { connection } from './db-connection';

export class GoodOrder extends Model {
    declare name: string;
    declare weight: number;
    declare cost: number;
    declare costGoods: number;
    declare freeMony: number;
    declare createAt: Date;
}

GoodOrder.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    costGoods: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    freeMony: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, { sequelize: connection.connection });
