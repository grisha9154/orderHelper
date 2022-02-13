import { DataTypes, Model } from "sequelize";
import { connection } from "./db-connection";

 
export class CostGoods extends Model {
    declare name: string;
    declare cost: number;
}

CostGoods.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, { sequelize: connection.connection });
