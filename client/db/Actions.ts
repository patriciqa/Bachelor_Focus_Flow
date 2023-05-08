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
      console.log(objectStore.autoIncrement);
      const serialized = JSON.parse(JSON.stringify(payload));
      const request = objectStore.add(serialized);
      console.log(request);
      // console.log( request.result);
      request.onerror = () => console.error(request.error);
      transaction.oncomplete = () => db.close();
      request.onsuccess = function (event: any) {
        const db = event.target.result;
        console.log(db);
        if (store === "examPhases") {
          localStorage.setItem("examId", db.toString());
        }
      };
    } else {
      console.error("couldn't  add element to database");
    }
  };
};
// export const getKey = () => {
//   const open = indexedDB.open("data");
//   open.onsuccess = () => {
//     db = open.result;

//     const title = "as";

//     // Open up a transaction as usual
//     const objectStore = db
//       .transaction(["examPhases"], "readwrite")
//       .objectStore("examPhases");

//     // Get the to-do list object that has this title as it's title
//     const objectStoreTitleRequest = objectStore.getAllKeys();

//     objectStoreTitleRequest.onsuccess = function () {
//       // Grab the data object returned as the result
//       const data: any = objectStoreTitleRequest.result;

//       data.map;
//       // // Update the notified value in the object to "yes"
//       // data.icon = "yes";

//       // Create another request that inserts the item back into the database
//       const updateTitleRequest = objectStore.put(data);

//       // When this new request succeeds, run the displayData() function again to update the display
//       updateTitleRequest.onsuccess = function () {
//         console.log(updateTitleRequest);
//       };
//     };
//   };
// };

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
export const removeElement = (store: string, key: string) => {
  const open = indexedDB.open("data");
  open.onsuccess = () => {
    let request: IDBRequest;
    db = open.result;
    if ([...db.objectStoreNames].find((name) => name === store)) {
      const transaction = db.transaction(store, "readwrite");
      const objectStore = transaction.objectStore(store);
      if (key === "all") request = objectStore.clear();
      else request = objectStore.delete(key);
      request.onerror = () => console.error(request.error);
      transaction.oncomplete = () => db.close();
    } else {
      indexedDB.deleteDatabase("data");
    }
  };
};
