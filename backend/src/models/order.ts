import { DataTypes, Model } from "sequelize";
import { connection } from "./db-connection";

export class Order extends Model {
    declare name: string;
    declare cost: number;
    declare costGoods: number;
    declare freeMony: number;
    declare date: Date;
}

Order.init({
    name: {
        type: DataTypes.STRING,
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
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, { sequelize: connection.connection });
