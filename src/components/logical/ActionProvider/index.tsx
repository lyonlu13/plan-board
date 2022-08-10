import Icon from "components/common/Icon";
import Model from "components/common/Model";
import { ActionContextInterface, ActionDefault } from "Contexts";
import useGeo from "hooks/useGeo";
import {
  InterObject,
  InterObjectInfo,
  Position,
} from "interObjects/define/interObject";
import {
  LookupBlock,
  LookupDefault,
  LookupProcessor,
  LookupSketch,
} from "interObjects/define/lookup";
import { cloneDeep } from "lodash";
import React, {
  createContext,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdBallot, MdBrush } from "react-icons/md";
import { TbCpu } from "react-icons/tb";
import styled from "styled-components";
import makeId from "utils/makeId";
import { DataCtx } from "../DataProvider";
import { ObjCtx } from "../ObjectProvider";
import NewObjectModal from "./NewObjectModal";

export const ActionCtx = createContext<ActionContextInterface>(ActionDefault);

export default function ActionProvider({ children }: Props) {
  const [showNewModel, setShowNewModel] = useState<boolean>(false);
  const { offsetX, offsetY } = useGeo();

  const {
    objects,
    setObjects,
    objectList,
    setObjectList,
    selectedList,
    select,
  } = useContext(ObjCtx);
  const { datas, setDatas } = useContext(DataCtx);
  const placeRecord = useRef<Position>({ x: 0, y: 0 });
  function showNewInterObjectModel() {
    setShowNewModel(true);
  }

  useEffect(() => {
    function mousedown(e: MouseEvent) {
      if (e.button === 2) {
        placeRecord.current = { x: e.clientX, y: e.clientY };
        setShowNewModel(true);
      }
    }
    function oncontextmenu(e: MouseEvent) {
      e.preventDefault();
      return false;
    }
    document.addEventListener("mousedown", mousedown);
    document.addEventListener("contextmenu", oncontextmenu);
    return () => {
      document.removeEventListener("mousedown", mousedown);
      document.removeEventListener("contextmenu", oncontextmenu);
    };
  }, [showNewModel]);

  useEffect(() => {
    function keydown(e: KeyboardEvent) {
      if (e.key === "Delete") {
        if (selectedList.length > 0) {
          const new_objects = cloneDeep(objects);
          const new_datas = cloneDeep(datas);
          let new_object_list = [...objectList];
          selectedList.forEach((id) => {
            delete new_objects[id];
            delete new_datas[id];
            new_object_list = new_object_list.filter((v) => v !== id);
          });
          select([]);
          setObjects(new_objects);
          setObjectList(new_object_list);
          setDatas(new_datas);
        }
      }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
    };
  }, [objects, datas, selectedList]);

  useEffect(() => {
    function paste(e: ClipboardEvent) {
      if (e.clipboardData === null) return;
      console.log(e.clipboardData.types);
      e.clipboardData.types.forEach((type) => {
        switch (type) {
          case "text/plain":
            console.log(type, e.clipboardData!.getData(type));
            break;
          case "text/html":
            console.log(type, e.clipboardData!.getData(type));
            break;
          case "Files":
            console.log(e.clipboardData!.files);
            break;
          default:
            break;
        }
      });
    }
    document.addEventListener("paste", paste);
    return () => {
      document.removeEventListener("paste", paste);
    };
  }, []);

  return (
    <ActionCtx.Provider
      value={{
        showNewInterObjectModel,
      }}
    >
      {children}
      <NewObjectModal
        placeRecord={placeRecord}
        show={showNewModel}
        onClose={() => setShowNewModel(false)}
      />
    </ActionCtx.Provider>
  );
}

interface Props {
  children: React.ReactNode;
}
