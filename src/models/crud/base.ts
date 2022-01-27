import { fireStore } from "../db-connection/firestore";
import { IBaseEntity } from "./base-entity";

export class BaseCRUD<T extends IBaseEntity> {
  private entityName: string;

  public constructor(entityName: string) {
    this.entityName = entityName;
  }

  public create(json: T): void {
    // const data = this.read();
    // data.push(json);
    // const text = JSON.stringify(data);
    // fs.writeFileSync(this.filePath, text);
  }

  public async read(): Promise<T[]> {
    const data = fireStore.read(this.entityName)
    return data as any;
  }

  public update(item: T): void {
    // const data = this.read();
    // const dataItem = data.find((x) => x.name === item.name);
    // const index = data.indexOf(dataItem);
    // data[index] = item;
    // fs.writeFileSync(this.filePath, JSON.stringify(data));
  }
}