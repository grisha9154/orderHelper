import { Sequelize } from "sequelize";

class DbConnector {
  private _connection: Sequelize;

  public constructor() {
    this._connection = this.createInstance();
  }

  public async init(): Promise<void> {
    await this._connection.authenticate();
    await this._connection.sync({ force: true });
  }

  public get connection(): Sequelize {
    return this._connection;
  }

  private createInstance() {
    return new Sequelize(process.env.DATABASE_URL as string, {
      dialectOptions: {
        ssl: {
          require: false,
          rejectUnauthorized: false,
        },
      },
    });
  }
}

export const connection = new DbConnector();
