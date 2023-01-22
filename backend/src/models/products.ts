import { DataTypes, Model } from "sequelize";
import { connection } from "./db-connection";

 
export class Product extends Model {
    declare id: number;
    declare title: string;
    declare description: string;
    declare price: number;
    declare categoryId: number;
}

Product.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,  
    },
}, { sequelize: connection.connection });
