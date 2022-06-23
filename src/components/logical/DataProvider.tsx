import { DataBulk, DataContextInterface, DataDefault } from 'Contexts'
import { TextSketchData } from 'interObjects/sketch/SketchText/Text'
import React, { createContext, useEffect, useState } from 'react'

export const DataCtx = createContext<DataContextInterface>(DataDefault)

const obj1 = new TextSketchData().loadFromJSON(
  `{
    "name": "obj1",
    "text": "Some useless text <br>text",
    "fontSize": 14,
    "color": {"background":"red","foreground":"white"}
  }`,
)

export default function DataProvider({ children }: Props) {
  const [dataBulk, setDataBulk] = useState<DataBulk>({
    obj1: obj1,
  })
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
