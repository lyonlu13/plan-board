import { DataBulk, DataContextInterface, DataDefault } from 'Contexts'
import {
  BlockTextDataDefault,
  SketchImageDataDefault,
  SketchTextData,
  SketchTextDataDefault,
} from 'interObjects/define/data'
import React, { createContext, useEffect, useState } from 'react'

export const DataCtx = createContext<DataContextInterface>(DataDefault)

const obj1 = SketchTextDataDefault()
const obj2 = SketchTextDataDefault()
const obj3 = SketchImageDataDefault()
const obj4 = BlockTextDataDefault()
const obj5 = BlockTextDataDefault()
const obj6 = BlockTextDataDefault()
const obj7 = BlockTextDataDefault()

export default function DataProvider({ children }: Props) {
  const [dataBulk, setDataBulk] = useState<DataBulk>({
    obj1,
    obj2,
    obj3,
    obj4,
    obj5,
    obj6,
    obj7,
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
