let db: IDBDatabase;

export const getElement = <T>(store: string, key: number | string) => {
  const open = indexedDB.open("data");
  return new Promise<T>((resolve, reject) => {
    open.onsuccess = () => {
      let request!: IDBRequest;
      db = open.result;
      if ([...db.objectStoreNames].find((name) => name === store)) {
        const transaction = db.transaction(store);
        const objectStore = transaction.objectStore(store);
        if (key === "all") request = objectStore.getAll();
        else request = objectStore.get(key);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        transaction.oncomplete = () => db.close();
      } else {
        console.error("could not get element from database");
      }
    };
  });
};
export const addElement = (store: string, payload: object) => {
  const open = indexedDB.open("data");
  open.onsuccess = () => {
    db = open.result;
    if ([...db.objectStoreNames].find((name) => name === store)) {
      const transaction = db.transaction(store, "readwrite");
      const objectStore = transaction.objectStore(store);
      const serialized = JSON.parse(JSON.stringify(payload));
      const request = objectStore.add(serialized);
      request.onerror = () => console.error(request.error);
      transaction.oncomplete = () => db.close();
      request.onsuccess = function (event: any) {
        const db = event.target.result;
      };
    } else {
      console.error("couldn't  add element to database");
    }
  };
};

export const editElement = <T>(
  store: string,
  key: number | string,
  payload: object
) => {
  const open = indexedDB.open("data");
  return new Promise<T>((resolve, reject) => {
    open.onsuccess = () => {
      let request: IDBRequest;
      db = open.result;
      if ([...db.objectStoreNames].find((name) => name === store)) {
        const transaction = db.transaction(store, "readwrite");
        const objectStore = transaction.objectStore(store);
        if (key === "all") request = objectStore.getAll();
        else request = objectStore.get(key);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const serialized = JSON.parse(JSON.stringify(payload));
          const updateRequest = objectStore.put(serialized);
          updateRequest.onsuccess = () => resolve(request.result);
        };
        transaction.oncomplete = () => db.close();
      } else {
        indexedDB.deleteDatabase("data");
      }
    };
  });
};

