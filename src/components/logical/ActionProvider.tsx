import Icon from "components/common/Icon";
import Model from "components/common/Model";
import {
  ActionContextInterface,
  ActionDefault,
  AppearanceContextInterface,
  AprcDefault,
  GeoDefault,
  GeometricContextInterface,
} from "Contexts";
import useGeo from "hooks/useGeo";
import parser from "html-metadata-parser";
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
import Select from "react-select/dist/declarations/src/Select";
import styled from "styled-components";
import makeId from "utils/makeId";
import { DataCtx } from "./DataProvider";
import { ObjCtx } from "./ObjectProvider";

export const ActionCtx = createContext<ActionContextInterface>(ActionDefault);

const Title = styled.div`
  display: flex;
  font-size: 20px;
  align-items: center;
  gap: 10px;
`;

const Panel = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export default function ActionProvider({ children }: Props) {
  const [showNewModel, setShowNewModel] = useState<boolean>(false);
  const { offsetX, offsetY } = useGeo();

  const { objects, setObjects, selectedList, select } = useContext(ObjCtx);
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
          selectedList.forEach((id) => {
            delete new_objects[id];
            delete new_datas[id];
          });
          select([]);
          setObjects(new_objects);
          setDatas(new_datas);
        }
      }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
    };
  }, [objects, datas, selectedList]);

  function newObj(info: InterObjectInfo) {
    console.log(info);

    const id = makeId(15);
    const new_objects = cloneDeep(objects);
    const new_datas = cloneDeep(datas);
    const obj = new InterObject(info.type, info.name, id).move({
      x: placeRecord.current.x - offsetX,
      y: placeRecord.current.y - offsetY,
    });

    const data = LookupDefault[info.name].mutate("id", id);
    new_objects[id] = obj;
    new_datas[id] = data;
    setObjects(new_objects);
    setDatas(new_datas);
    setShowNewModel(false);
  }

  useEffect(() => {
    function paste(e: ClipboardEvent) {
      if (e.clipboardData === null) return;
      // const pastedText = e.clipboardData.getData('text/plain');
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
      <Model
        setShow={setShowNewModel}
        show={showNewModel}
        title="New Interact Object"
        icon="MdLibraryAdd"
      >
        <Title>
          <MdBrush /> Sketch
        </Title>
        <hr />
        <Panel>
          {Object.keys(LookupSketch).map((key) => (
            <Item
              key={key}
              onClick={() => {
                newObj(LookupSketch[key]);
              }}
              info={LookupSketch[key]}
            />
          ))}
        </Panel>
        <Title>
          <MdBallot /> Block
        </Title>
        <hr />
        <Panel>
          {Object.keys(LookupBlock).map((key) => (
            <Item
              key={key}
              onClick={() => {
                newObj(LookupBlock[key]);
              }}
              info={LookupBlock[key]}
            />
          ))}
        </Panel>
        <Title>
          <TbCpu /> Processor
        </Title>
        <hr />
        <Panel>
          {Object.keys(LookupProcessor).map((key) => (
            <Item
              key={key}
              onClick={() => {
                newObj(LookupProcessor[key]);
              }}
              info={LookupProcessor[key]}
            />
          ))}
        </Panel>
      </Model>
    </ActionCtx.Provider>
  );
}

interface Props {
  children: React.ReactNode;
}

const ItemRoot = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 140px;
  height: 140px;
  gap: 10px;
  background-color: #494949;
  font-size: 16px;
  transition: 0.3s;
  padding: 5px;
  &:hover {
    background-color: #949494;
  }
`;

function Item({ onClick, info }: ItemProps) {
  return (
    <ItemRoot onClick={onClick}>
      <Icon size={36} icon={info.icon} color="#ffffff" />
      {info.displayName}
    </ItemRoot>
  );
}

interface ItemProps {
  onClick: MouseEventHandler;
  info: InterObjectInfo;
}
