import { DataTypes, Model } from "sequelize";
import { connection } from "./db-connection";

export class UserPermission extends Model {
  declare userId: number;
  declare isAdmin: boolean;
}

UserPermission.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
  },
  { sequelize: connection.connection }
);
