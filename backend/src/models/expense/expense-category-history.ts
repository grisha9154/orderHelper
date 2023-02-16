import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { connection } from "../db-connection";
import { Expense } from "./expense";

export class ExpenseCategoryHistory extends Model<
  InferAttributes<ExpenseCategoryHistory>,
  InferCreationAttributes<ExpenseCategoryHistory>
> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare description?: string;
  declare mainEntityId: string;

  declare expenses: NonAttribute<Expense[]>;
}

ExpenseCategoryHistory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    mainEntityId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { sequelize: connection.connection },
);
