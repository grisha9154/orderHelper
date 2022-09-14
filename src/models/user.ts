import { DataTypes, Model } from "sequelize";
import { connection } from "./db-connection";

export class TgChat extends Model {
    declare name: string;
    declare chatId: string;
}

TgChat.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    chatId: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { sequelize: connection.connection });