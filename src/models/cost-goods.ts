import { DataTypes, Model } from "sequelize";
import { connection } from "./db-connection";

 
export class CostGoods extends Model {
    declare name: string;
    declare cost: number;
    declare originCost: number;
    declare margin: number;
    declare originWeight: number;
    declare dryWeight: number;
    declare dryCost: number;
    declare costPrice: number;
    declare totalCost: number;
    declare additionalExpenses: number;
}

CostGoods.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    originCost: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    margin: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    originWeight: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    dryWeight: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    dryCost: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    costPrice: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    totalCost: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    additionalExpenses: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }
}, { sequelize: connection.connection });
