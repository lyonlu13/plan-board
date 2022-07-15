import { DataBulk, DataContextInterface, DataDefault } from 'Contexts'
import useDB from 'hooks/useDB'
import {
  SketchTextDataDefault,
} from 'interObjects/define/data'
import LoadData from 'interObjects/define/dataLoader'
import { InterObjectData } from 'interObjects/define/interObject'
import React, { createContext, useEffect, useState } from 'react'

export const DataCtx = createContext<DataContextInterface>(DataDefault)

const obj1 = SketchTextDataDefault().mutate("id", "default")

export default function DataProvider({ children }: Props) {
  const [dataBulk, setDataBulk] = useState<DataBulk>({
    obj1,
  })

  const {data, sync} = useDB<InterObjectData>("datas", "New", {key:"id",indexs:[],defaultData:[obj1]},LoadData)

  
  useEffect(() => {
    setDataBulk(data)
  },[data])

  useEffect(() => {
    const timeout = setTimeout(()=>sync(dataBulk),2000)
    return ()=> clearTimeout(timeout)
  },[dataBulk])

  return (
    <DataCtx.Provider
      value={{
        datas: dataBulk,
        setDatas: setDataBulk,
      }}
    >
      {children}
    </DataCtx.Provider>
  )
}

interface Props {
  children: React.ReactNode
}
