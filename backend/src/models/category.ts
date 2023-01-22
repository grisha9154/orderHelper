import { DataTypes, Model } from "sequelize";
import { connection } from "./db-connection";

 
export class Category extends Model {
    declare id: number;
    declare title: string;
    declare description: string;
}

Category.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { sequelize: connection.connection });
