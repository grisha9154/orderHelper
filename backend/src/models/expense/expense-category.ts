import {
  CreateOptions,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { connection } from "../db-connection";
import { ExpenseCategoryHistory } from "./expense-category-history";

export class ExpenseCategory extends Model<
  InferAttributes<ExpenseCategory>,
  InferCreationAttributes<ExpenseCategory>
> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare description?: string;

  declare histories: NonAttribute<ExpenseCategoryHistory[]>;
}

const addHistory = async (data: ExpenseCategory, options: CreateOptions) => {
  try {
    await ExpenseCategoryHistory.create(
      {
        title: data.title,
        description: data.description,
        mainEntityId: data.id,
      },
      { transaction: options.transaction },
    );

    await options.transaction?.commit();
  } catch (ex) {
    await options.transaction?.rollback();
    throw ex;
  }
};

const setTransaction = async (_data: unknown, options: CreateOptions) => {
  if (!options.transaction) {
    options.transaction = await connection.connection.transaction();
  }
};

ExpenseCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: setTransaction,
      beforeUpdate: setTransaction,
      beforeBulkCreate: setTransaction,
      beforeBulkUpdate: (options) => {
        options.individualHooks = true;
        setTransaction(null, options);
      },
      afterCreate: addHistory,
      afterUpdate: addHistory,
    },
    sequelize: connection.connection,
  },
);

ExpenseCategory.hasMany(ExpenseCategoryHistory, {
  sourceKey: "id",
  foreignKey: "mainEntityId",
  as: "histories",
});
