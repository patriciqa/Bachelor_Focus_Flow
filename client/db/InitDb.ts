export default function initDb() {
  const keys = {
    activities: [{ name: "uuid", unique: true }],
    reasons: [{ name: "uuid", unique: true }],
    examPhases: [{ name: "uuid", unique: true }],
  };
  let db!: IDBDatabase;
  const request = indexedDB.open("data", 1);
  request.onerror = (err) =>
    console.error(`IndexedDB error: ${request.error}`, err);
  request.onsuccess = () => (db = request.result);
  request.onupgradeneeded = () => {
    const db = request.result;
    const activityStore = db.createObjectStore("activities", {
      keyPath: keys.activities[0].name,
      autoIncrement: true,
    });
    const reasonStore = db.createObjectStore("reasons", {
      keyPath: "id",
      autoIncrement: true,
    });
    const examPhaseStore = db.createObjectStore("examPhases", {
      keyPath: "id",
      autoIncrement: true,
    });
    const activeStore = db.createObjectStore("active", {
      keyPath: "id",
      autoIncrement: true,
    });
    keys.activities.forEach((key) =>
      activityStore.createIndex(key.name, key.name, { unique: key.unique })
    );
    // keys.reasons.forEach((key) =>
    //   reasonStore.createIndex(key.name, key.name, { unique: key.unique })
    // );
    // keys.examPhases.forEach((key) =>
    //   examPhaseStore.createIndex(key.name, key.name, { unique: key.unique })
    // );
  };
  return db;
}
