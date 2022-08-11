import Icon from "components/common/Icon";
import Model from "components/common/Model";
import { DataCtx } from "components/logical/DataProvider";
import { ObjCtx } from "components/logical/ObjectProvider";
import { ActionContextInterface, ActionDefault } from "Contexts";
import useGeo from "hooks/useGeo";
import {
  InterObject,
  InterObjectData,
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
import React, { createContext, MouseEventHandler, useContext } from "react";
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

export interface PasteObject {
  name?: string;
  info: InterObjectInfo;
  data: InterObjectData;
}

export default function PasteModal({
  show,
  onClose,
  placeRecord,
  pasteList,
}: Props) {
  const { offsetX, offsetY } = useGeo();

  const { objects, setObjects, objectList, setObjectList } = useContext(ObjCtx);
  const { datas, setDatas } = useContext(DataCtx);

  function newObj(pasteObj: PasteObject) {
    const id = makeId(15);
    const new_objects = cloneDeep(objects);
    const new_datas = cloneDeep(datas);
    const obj = new InterObject(
      pasteObj.info.type,
      pasteObj.info.name,
      id
    ).move({
      x: placeRecord.current.x - offsetX,
      y: placeRecord.current.y - offsetY,
    });

    const data = pasteObj.data.mutate("id", id);
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
      title="Paste as..."
      icon="MdContentPaste"
    >
      <Panel>
        {pasteList.map((pasteObject) => (
          <Item
            key={pasteObject.info.name}
            onClick={() => {
              newObj(pasteObject);
            }}
            info={pasteObject.info}
            name={pasteObject.name || ""}
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
  pasteList: PasteObject[];
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

function Item({ onClick, info, name }: ItemProps) {
  return (
    <ItemRoot onClick={onClick}>
      <Icon size={36} icon={info.icon} color="#ffffff" />
      {name || info.displayName}
    </ItemRoot>
  );
}

interface ItemProps {
  onClick: MouseEventHandler;
  info: InterObjectInfo;
  name: string;
}
