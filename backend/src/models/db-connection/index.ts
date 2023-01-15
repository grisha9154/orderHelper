import { Options, Sequelize } from "sequelize";

class DbConnector {
  private _connection: Sequelize;

  public constructor() {
    this._connection = this.createInstance();
  }

  public async init(): Promise<void> {
    await this._connection.authenticate();
    await this._connection.sync({ force: false });
  }

  public get connection(): Sequelize {
    return this._connection;
  }

  private createInstance() {
    const options: Options | undefined =
      process.env.DEV === "true"
        ? {
            dialect: 'mysql', 
          }
        : {
            dialect: 'mysql',
            dialectOptions: {
              ssl: {
                require: false,
                rejectUnauthorized: false,
              },
            },
          };
    return new Sequelize(process.env.DATABASE_URL as string, options);
  }
}

export const connection = new DbConnector();
