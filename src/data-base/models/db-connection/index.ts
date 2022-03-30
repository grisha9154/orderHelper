import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";


class DbConnector {
  private _connection: Sequelize;

  public constructor() {
    this._connection = this.createInstance();
  }

  public async init(): Promise<void> {
    await this._connection.authenticate();
    await this._connection.sync({ force: false });
    const umzug = new Umzug({
      migrations: { glob: 'migrations/*.js' },
      context: this._connection.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize: this._connection }),
      logger: console,
    });
    await umzug.up();
  }

  public get connection(): Sequelize {
    return this._connection;
  }

  private createInstance() {
    return new Sequelize(process.env.DATABASE_URL as string, {
      dialectOptions: {},
    });
  }
}

export const connection = new DbConnector();
