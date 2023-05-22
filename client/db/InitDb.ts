export default function initDb() {
  // const keys = {
  //   activities: [{ name: "uuid", unique: true }],
  //   // reasons: [{ name: "uuid", unique: true }],
  //   examPhases: [{ name: "uuid", unique: true }],
  // };
  let db!: IDBDatabase;
  const request = indexedDB.open("data", 1);
  request.onerror = (err) =>
    console.error(`IndexedDB error: ${request.error}`, err);
  request.onsuccess = () => (db = request.result);
  request.onupgradeneeded = () => {
    const db = request.result;
    db.createObjectStore("activities", {
      keyPath: "id",
      autoIncrement: true,
    });
    db.createObjectStore("reasons", {
      keyPath: "id",
      autoIncrement: true,
    });
    db.createObjectStore("examPhases", {
      keyPath: "id",
      autoIncrement: true,
    });

    request.onsuccess = function (event) {
      var db = event.target.result;

      // Start a new transaction
      var transaction = db.transaction(["reasons", "activities"], "readwrite");

      // Get the object store for reasons
      var reasonObjectStore = transaction.objectStore("reasons");

      // Add reasons to the object store
      var reasons = [
        { title: "tired", archived: false, goodReason: false, icon: "fa-solid fa-moon" },
        { title: "distracted by phone", archived: false, goodReason: false, icon: "fa-solid fa-mobile-screen" },
        { title: "no interest in subject", archived: false, goodReason: false, icon: "fa-solid fa-face-rolling-eyes" },
        { title: "lots of noise around", archived: false, goodReason: false, icon: "fa-solid fa-bullhorn" },
        { title: "bad mood", archived: false, goodReason: false, icon: "fa-solid fa-face-angry" },
        { title: "studied for too long", archived: false, goodReason: false, icon: "fa-solid fa-face-dizzy" },
        { title: "hungry", archived: false, goodReason: false, icon: "fa-solid fa-pizza-slice" },
        { title: "too many people around", archived: false, goodReason: false, icon: "fa-solid fa-people-group" },
        { title: "well rested", archived: false, goodReason: true, icon: "fa-solid fa-moon" },
        { title: "good mood", archived: false, goodReason: true, icon: "fa-solid fa-face-grin" },
        { title: "interest in subject", archived: false, goodReason: true, icon: "fa-solid fa-face-smile-wink" },
        { title: "studying with friends", archived: false, goodReason: true, icon: "fa-solid fa-people-group" },
        { title: "music", archived: false, goodReason: true, icon: "fa-solid fa-music" },
        { title: "studying in school", archived: false, goodReason: true, icon: "fa-solid fa-school" },

      ];

      reasons.forEach(function (reason) {
        reasonObjectStore.add(reason);
      });

      var transactionActivity = db.transaction(["activities"], "readwrite");
      // Get the object store for activities
      var activityObjectStore = transactionActivity.objectStore("activities");

      // Add activities to the object store
      var activities = [
        { title: "go for a walk", archived: false, icon: "fa-solid fa-person-walking" },
        { title: "eat a snack", archived: false, icon: "fa-solid fa-cookie-bite" },
        { title: "get a coffee", archived: false, icon: "fa-solid fa-mug-hot" },
        { title: "stretching exercises", archived: false, icon: "fa-solid fa-child-reaching" },
        { title: "meditate", archived: false, icon: "fa-solid fa-hands-praying" },
        { title: "take a nap", archived: false, icon: "fa-solid fa-bed" },
        { title: "social media", archived: false, icon: "fa-solid fa-comment-dots" },
        { title: "watch a video", archived: false, icon: "fa-solid fa-circle-play" },
        { title: "watch 1 episode of a series", archived: false, icon: "fa-solid fa-tv" }
      ];

      activities.forEach(function (activity) {
        activityObjectStore.add(activity);
      });

      transaction.oncomplete = function () {
        console.log("Values added to the object store.");
      };
    };



  };
  return db;
}
