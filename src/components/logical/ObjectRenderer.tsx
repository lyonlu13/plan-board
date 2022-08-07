import { ObjectType, ProcessorInfo } from "interObjects/define/interObject";
import React, { useContext } from "react";
import { ObjCtx } from "./ObjectProvider";
import { LookupInterObjs } from "interObjects/define/lookup";
import Processor from "interObjects/struct/Processor";

export default function ObjectRenderer() {
  const { objects, objectList, selectedList } = useContext(ObjCtx);

  return (
    <>
      {objectList.map((key) => {
        const obj = objects[key];
        if (!obj) return null;
        const objInfo = LookupInterObjs[obj.subname];

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
            );
          } else {
            const Cmp = objInfo.component;
            return (
              <Cmp
                key={key}
                id={key}
                x={obj.pos.x}
                y={obj.pos.y}
                selected={selectedList.indexOf(key) !== -1}
              />
            );
          }
        } else return null;
      })}
    </>
  );
}
