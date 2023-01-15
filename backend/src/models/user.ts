import { DataTypes, Model } from "sequelize";
import { connection } from "./db-connection";

export class User extends Model {
    declare id: string;
    declare name: string;
    declare password: string;
    declare login: string;
}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { sequelize: connection.connection });