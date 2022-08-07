import { DataCtx } from "components/logical/DataProvider";
import { useContext, useEffect, useState } from "react";
import { cloneDeep, isEqual } from "lodash";

export interface DBOption<T> {
  defaultData: T[];
}

export default function useLinearDB<T>(dbName: string, option: DBOption<T>) {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const result = localStorage.getItem(dbName);
    if (result) {
      setData(JSON.parse(result));
    } else {
      setData(option.defaultData);
      localStorage.setItem(dbName, JSON.stringify(option.defaultData));
    }
  }, []);

  function sync(value: T[]) {
    localStorage.setItem(dbName, JSON.stringify(value));
  }

  return { data, sync };
}
