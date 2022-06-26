import { InterObjectInfo } from 'interObjects/define/interObject'
import {
  BlockTextInfo,
  SketchImageInfo,
  SketchTextInfo,
} from 'interObjects/define/info'
import React, { useContext } from 'react'
import { ObjCtx } from './ObjectProvider'
import { LookupInfo } from 'interObjects/define/lookup'

export default function ObjectRenderer() {
  const { objects, selectedList } = useContext(ObjCtx)

  return (
    <>
      {Object.keys(objects).map((key) => {
        const obj = objects[key]
        const objInfo = LookupInfo[obj.subname]

        if (objInfo) {
          const Cmp = objInfo.component
          return (
            <Cmp
              key={key}
              id={key}
              x={obj.pos.x}
              y={obj.pos.y}
              selected={selectedList.indexOf(key) !== -1}
            />
          )
        } else return null
      })}
    </>
  )
}
