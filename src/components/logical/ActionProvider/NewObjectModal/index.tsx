import Icon from "components/common/Icon";
import Model from "components/common/Model";
import { DataCtx } from "components/logical/DataProvider";
import { ObjCtx } from "components/logical/ObjectProvider";
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
  Ref,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdBallot, MdBrush } from "react-icons/md";
import { TbCpu } from "react-icons/tb";
import styled from "styled-components";
import makeId from "utils/makeId";

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

export default function NewObjectModal({ show, onClose, placeRecord }: Props) {
  const { offsetX, offsetY } = useGeo();

  const { objects, setObjects, objectList, setObjectList } = useContext(ObjCtx);
  const { datas, setDatas } = useContext(DataCtx);

  function newObj(info: InterObjectInfo) {
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
    setObjectList([...objectList, id]);
    setDatas(new_datas);
    onClose();
  }

  return (
    <Model
      onClose={onClose}
      show={show}
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
  );
}

interface Props {
  show: boolean;
  onClose: () => void;
  placeRecord: React.MutableRefObject<Position>;
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
