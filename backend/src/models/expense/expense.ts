import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyAddAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  ForeignKey,
} from "sequelize";
import { connection } from "../db-connection";
import { ExpenseCategoryHistory } from "./expense-category-history";

export class Expense extends Model<
  InferAttributes<Expense>,
  InferCreationAttributes<Expense, { omit: "id" }>
> {
  declare id: CreationOptional<string>;
  declare cost: number;
  declare paymentDate: Date;

  declare expenseCategoryHistoryId: ForeignKey<string>;
  declare expenseCategoryHistory: NonAttribute<ExpenseCategoryHistory>;
}

Expense.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize: connection.connection },
);

Expense.belongsTo(ExpenseCategoryHistory, {
  foreignKey: "expenseCategoryHistoryId",
  as: "expenseCategoryHistory",
});

ExpenseCategoryHistory.hasMany(Expense, {
  sourceKey: "id",
  foreignKey: "expenseCategoryHistoryId",
  as: "expenses",
});
