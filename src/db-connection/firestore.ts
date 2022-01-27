import { Firestore } from "@google-cloud/firestore";

class FireStore {
  private dbConnector: Firestore;
  private payload: Record<string, any>;

  public async initializePayload(collectionName: string, docName: string) {
    this.dbConnector = new Firestore({
      projectId: process.env.project_name,
      keyFilename: '/key-file.json'
    });
    this.payload = (
      await this.dbConnector.collection(collectionName).doc(docName).get()
    ).data();
  }

  public read(entityName: string) {
      return this.payload[entityName]
  }
}

export const fireStore = new FireStore();
