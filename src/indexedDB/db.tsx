import { openDB } from "idb";

const db = await openDB("app", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("to-do-list")) {
      const toDoListStore = db.createObjectStore("to-do-list", {
        keyPath: "createdAt",
      });

      toDoListStore.createIndex("statusIndex", "status", { unique: false });
      toDoListStore.createIndex("priorityIndex", "priority", { unique: false });
    }
  },
});

export { db };
