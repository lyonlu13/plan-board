import { DataCtx } from 'components/logical/DataProvider'
import { useContext, useEffect, useState } from 'react'

export default function useData(id: string) {
  const { datas, setDatas } = useContext(DataCtx)

  function modify(path: string, value: any) {
    const data = datas[id]
    data.mutate(path, value)
    setDatas(datas)
    console.log(data)
  }

  return { data: datas[id], modify }
}
