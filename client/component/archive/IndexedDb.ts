import { IDBPDatabase, openDB } from "idb";

class IndexedDb {
  private database: string;
  private db: any;

  constructor(database: string) {
    this.database = database;
  }
  public async databaseExists(dbname: string) {
    const isExisting = await (await window.indexedDB.databases())
      .map((db) => db.name)
      .includes(dbname);
    console.log(isExisting);
    return isExisting;
  }

  public async createObjectStore(tableNames: string[]) {
    try {
      this.db = await openDB(this.database, 1, {
        upgrade(db: IDBPDatabase) {
          for (const tableName of tableNames) {
            if (db.objectStoreNames.contains(tableName)) {
              continue;
            }
            db.createObjectStore(tableName, {
              autoIncrement: true,
              keyPath: "id",
            });
          }
        },
      });
      console.log(this.db);
    } catch (error) {
      return false;
    }
  }

  public async getValue(tableName: string, id: number) {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    console.log("Get Data ", JSON.stringify(result));
    return result;
  }

  public async getAllValue(tableName: string) {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.getAll();
    console.log("Get All Data", JSON.stringify(result));
    return result;
  }

  public async putValue(tableName: string, value: object) {
    console.log(this.db);

    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    try {
      await tx.complete;
      let result;
      // if (key) {
      //   result = await store.put(value, key);
      // } else {
      result = await store.put(value);
      // }
      console.log("Put Data ", JSON.stringify(result));
    } catch (err: any) {
      console.log("error", err.message);
    }
  }
  public async updateValue(tableName: string, value: object, key?: number) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const request = store.get(key);

    try {
      await tx.complete;
      let result;
      result = await store.update(value);
      console.log("Put Data ", JSON.stringify(result));
    } catch (err: any) {
      console.log("error", err.message);
    }
  }

  public async putBulkValue(tableName: string, values: object[]) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    for (const value of values) {
      try {
        await tx.complete;
        const result = await store.put(value);
        console.log("Put Bulk Data ", JSON.stringify(result));
      } catch (err: any) {
        console.log("error", err.message);
      }
    }
    return this.getAllValue(tableName);
  }

  public async deleteValue(tableName: string, id: number) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    if (!result) {
      console.log("Id not found", id);
      return result;
    }
    await store.delete(id);
    console.log("Deleted Data", id);
    return id;
  }
}

export default IndexedDb;
