import {
  InterObjectInfo,
  ObjectType,
  ProcessorInfo,
} from 'interObjects/define/interObject'
import {
  BlockTextInfo,
  SketchImageInfo,
  SketchTextInfo,
} from 'interObjects/define/info'
import React, { useContext } from 'react'
import { ObjCtx } from './ObjectProvider'
import { LookupInterObjs } from 'interObjects/define/lookup'
import Processor from 'interObjects/struct/Processor'

export default function ObjectRenderer() {
  const { objects, selectedList } = useContext(ObjCtx)

  return (
    <>
      {Object.keys(objects).map((key) => {
        const obj = objects[key]

        const objInfo = LookupInterObjs[obj.subname]
        console.log(obj,objInfo);
        
        if (objInfo) {
          if (obj.type === ObjectType.Processor) {
            return (
              <Processor
                key={key}
                id={key}
                x={obj.pos.x}
                y={obj.pos.y}
                selected={selectedList.indexOf(key) !== -1}
                info={objInfo as ProcessorInfo}
              />
            )
          } else {
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
          }
        } else return null
      })}
    </>
  )
}
