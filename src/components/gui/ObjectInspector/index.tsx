import styled from "styled-components";
import { MdAccountTree, MdInfo } from "react-icons/md";
import { useContext } from "react";
import { ObjCtx } from "components/logical/ObjectProvider";
import ObjectInspectorItem from "./ObjectInspectorItem";
import { DataCtx } from "components/logical/DataProvider";
import { LookupInterObjs } from "interObjects/define/lookup";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  font-size: 16px;
  background-color: #464646;
  color: white;
  padding: 10px;
  z-index: 2;
  border-radius: 10px;
  transition: 0.3s;
`;

const Title = styled.div`
  font-size: 16px;
`;

const HR = styled.hr`
  width: 100%;
  border-color: white;
  margin: 0px 0px 5px 0px;
`;

export default function ObjectInspector() {
  const { selectedList, objectList, objects } = useContext(ObjCtx);
  const { datas } = useContext(DataCtx);

  return (
    <Root onMouseDown={(e) => e.stopPropagation()}>
      <Title>
        <MdAccountTree /> Objects
      </Title>
      <HR />
      {objectList.map((key) => {
        const obj = objects[key];
        const data = datas[key];
        if (obj && data)
          return (
            <ObjectInspectorItem
              key={data.id}
              name={data.name}
              icon={LookupInterObjs[obj.subname].icon}
              selected={selectedList.indexOf(key) > -1}
            />
          );
        return null;
      })}
    </Root>
  );
}
