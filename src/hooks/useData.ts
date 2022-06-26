import { DataCtx } from 'components/logical/DataProvider'
import { useContext, useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'

export interface MultiCast {
  [path: string]: any
}

export default function useData(id: string) {
  const { datas, setDatas } = useContext(DataCtx)

  function modify(path: string, value: any) {
    const new_data = cloneDeep(datas)
    new_data[id].mutate(path, value)
    setDatas(new_data)
  }

  function multiModify(mc: MultiCast) {
    const new_data = cloneDeep(datas)
    Object.keys(mc).forEach((cast) => {
      new_data[id].mutate(cast, mc[cast])
    })
    setDatas(new_data)
  }

  return { data: datas[id], modify, multiModify }
}
