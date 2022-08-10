import styled from "styled-components";
import Icon from "components/common/Icon";
import { InterObject } from "interObjects/define/interObject";
import { MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useContext } from "react";
import { ObjCtx } from "components/logical/ObjectProvider";
import { cloneDeep } from "lodash";

const Root = styled.div`
  display: flex;
  align-items: start;
  gap: 5px;
  font-size: 16px;
  color: white;
  width: 250px;
  &:hover {
    background-color: gray;
  }
`;

const NameText = styled.div`
  width: 180px;
  text-align: left;
`;

const Hover = styled.a`
  transition: 0.3s;
  color: #ffffff00;
  cursor: pointer;
  &:hover {
    color: white !important;
  }
`;

interface Props {
  icon: string;
  name: string;
  selected: boolean;
  object: InterObject;
}

export default function ObjectInspectorItem({
  icon,
  name,
  selected,
  object,
}: Props) {
  const { objects, setObjects } = useContext(ObjCtx);
  const { unselect } = useContext(ObjCtx);

  function setLock(val: boolean) {
    const newObjects = cloneDeep(objects);
    newObjects[object.id].locked = val;
    setObjects(newObjects);
    if (val) {
      unselect([object.id]);
    }
  }

  function setVisibility(val: boolean) {
    const newObjects = cloneDeep(objects);
    newObjects[object.id].visibility = val;
    setObjects(newObjects);
  }

  return (
    <Root
      style={{
        backgroundColor: selected ? "gray" : undefined,
      }}
    >
      <Icon icon={icon} color="white" />
      <NameText>{name}</NameText>
      <Hover
        style={{ color: object.locked ? "white" : undefined }}
        onClick={() => setLock(!object.locked)}
      >
        <MdLock size={20} />
      </Hover>
      <Hover
        style={{ color: "#c5c5c5" }}
        onClick={() => setVisibility(!object.visibility)}
      >
        {object.visibility ? (
          <MdVisibility size={20} />
        ) : (
          <MdVisibilityOff size={20} />
        )}
      </Hover>
    </Root>
  );
}
