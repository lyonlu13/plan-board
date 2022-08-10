import { MediaContextInterface, MediaDefault } from "Contexts";
import React, { createContext, useEffect, useRef } from "react";
import makeId from "utils/makeId";

export const MediaCtx = createContext<MediaContextInterface>(MediaDefault);

export default function MediaProvider({ children }: Props) {
  const db = useRef<IDBDatabase | null>();
  const caches = useRef<{ [_: string]: string }>({});

  useEffect(() => {
    var request = indexedDB.open("Media", 2);
    request.onerror = function (event) {};
    request.onupgradeneeded = function (event: IDBVersionChangeEvent) {
      if (!event || !event.target) return;
      const e = event as IDBVersionChangeEvent & {
        target: { result: IDBDatabase };
      };
      db.current = e.target.result;

      db.current.createObjectStore("image", { keyPath: "id" });
    };
    request.onsuccess = function () {
      db.current = request.result;
    };
  }, []);

  function newImage(name: string, blob: Blob) {
    return new Promise<string>((resolve, reject) => {
      if (!db.current) return reject("DB is not ready!");
      const reader = new FileReader();
      reader.onload = (e) => {
        let ob = {
          id: makeId(),
          name,
          b: reader.result,
          type: blob.type,
        };
        let trans = db.current!.transaction(["image"], "readwrite");
        let req = trans.objectStore("image").add(ob);
        req.onerror = function (e) {
          reject(e);
        };
        trans.oncomplete = function () {
          resolve(ob.id);
        };
      };
      reader.onerror = reject;
      reader.readAsBinaryString(blob);
    });
  }

  function img(id: string) {
    return new Promise<string>((resolve, reject) => {
      if (caches.current[id]) return resolve(caches.current[id]);
      let trans = db.current!.transaction(["image"], "readwrite");
      trans.objectStore("image").get(id).onsuccess = function (e: any) {
        if (e.target.result) {
          let { type, b } = e.target.result;
          let array = new Uint8Array(b.length);
          for (var i = 0; i < b.length; i++) {
            array[i] = b.charCodeAt(i);
          }
          var blob = new Blob([array], { type: type });
          resolve((caches.current[id] = URL.createObjectURL(blob)));
        } else {
          reject("NULL");
        }
      };
      return id;
    });
  }

  function allImage() {
    return new Promise<string[]>((resolve, reject) => {
      if (!db.current) return reject("DB is not ready!");
      let objectStore = db.current.transaction("image").objectStore("image");
      let list: string[] = [];
      objectStore.openCursor().onsuccess = function (event: any) {
        var cursor = event.target.result;
        if (cursor) {
          list.push(cursor.key);
          cursor.continue();
        } else {
          resolve(list);
        }
      };
    });
  }

  return (
    <MediaCtx.Provider value={{ newImage, allImage, img }}>
      {children}
    </MediaCtx.Provider>
  );
}

interface Props {
  children: React.ReactNode;
}
