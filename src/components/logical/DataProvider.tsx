import { DataBulk, DataContextInterface, DataDefault } from 'Contexts'
import {
  BlockTextDataDefault,
  ProcessorArrayData,
  ProcessorConcatData,
  ProcessorJoinData,
  ProcessorSplitData,
  ProcessorTextCountData,
  SketchImageDataDefault,
  SketchTextData,
  SketchTextDataDefault,
} from 'interObjects/define/data'
import React, { createContext, useEffect, useState } from 'react'

export const DataCtx = createContext<DataContextInterface>(DataDefault)

const obj1 = SketchTextDataDefault()
const obj2 = SketchTextDataDefault()
const obj3 = SketchImageDataDefault()
const obj4 = new ProcessorJoinData()
const obj5 = BlockTextDataDefault()
const obj6 = BlockTextDataDefault()
const obj7 = BlockTextDataDefault()
const obj8 = new ProcessorTextCountData()
const obj9 = new ProcessorConcatData()
const obj10 = new ProcessorArrayData()
const obj11 = new ProcessorSplitData()

export default function DataProvider({ children }: Props) {
  const [dataBulk, setDataBulk] = useState<DataBulk>({
    obj1,
    obj2,
    obj3,
    obj4,
    obj5,
    obj6,
    obj7,
    obj8,
    obj9,
    obj10,
    obj11,
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
