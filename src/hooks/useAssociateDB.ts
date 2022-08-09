import { DataCtx } from "components/logical/DataProvider";
import { useContext, useEffect, useState } from "react";
import { cloneDeep, isEqual } from "lodash";

export interface DBOption<T> {
  key: string;
  indexs: string[];
  defaultData: T[];
}

export default function useAssociateDB<T>(
  dbName: string,
  storeName: string,
  option: DBOption<T>,
  process?: (data: any) => T
) {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [data, setData] = useState<{ [_: string]: T } | null>(null);

  useEffect(() => {
    console.log(dbName, storeName);
    var request = indexedDB.open(dbName, 2);
    request.onerror = function (event) {
      console.error(event);
    };
    request.onupgradeneeded = function (event: IDBVersionChangeEvent) {
      if (!event || !event.target) return;
      const e = event as IDBVersionChangeEvent & {
        target: { result: IDBDatabase };
      };
      let db = e.target.result;

      const defaultData: { [_: string]: any } = {
        objects: [],
        datas: [],
        flows: [],
      };

      let ObjStore = db.createObjectStore("objects", {
        keyPath: option.key,
      });
      let DataStore = db.createObjectStore("datas", {
        keyPath: option.key,
      });
      let FlowStore = db.createObjectStore("flows", {
        keyPath: option.key,
      });

      setDb(db);
      setData(defaultData[storeName]);
    };

    request.onsuccess = function () {
      let db = request.result;
      let objectStore: IDBObjectStore | null = null;

      console.log(storeName);
      objectStore = db.transaction(storeName).objectStore(storeName);

      const readData: { [_: string]: T } = {};

      objectStore.openCursor().onsuccess = function (event: any) {
        var cursor = event.target.result;
        if (cursor) {
          readData[cursor.key] = (process
            ? process(cursor.value)
            : cursor.value) as unknown as T;
          cursor.continue();
        } else {
          setDb(db);
          setData(readData);
        }
      };
    };

    return () => {
      if (db) db.close();
    };
  }, [dbName]);

  function put(newItem: T) {
    if (!db) return;
    let transaction = db.transaction([storeName], "readwrite");
    var objectStore = transaction.objectStore(storeName);

    var request = objectStore.put(newItem);
    request.onsuccess = function (event) {
      console.log("succeed", newItem);
    };
  }

  function remove(id: string) {
    if (!db) return;
    var request = db
      .transaction([storeName], "readwrite")
      .objectStore(storeName)
      .delete(id);
    request.onsuccess = function (event) {
      console.log("succeed", request);
    };
  }

  function sync(newData: { [_: string]: T }) {
    if (!data) return;
    if (isEqual(newData, data)) return;
    // new and update
    Object.keys(newData).forEach((key) => {
      if (data[key] === undefined || !isEqual(newData[key], data[key])) {
        put(newData[key]);
      }
    });

    // remove
    Object.keys(data).forEach((key) => {
      if (newData[key] === undefined) {
        remove(key);
      }
    });
    setData(newData);
  }

  return { data, remove, put, sync };
}
