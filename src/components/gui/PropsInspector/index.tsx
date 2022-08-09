import styled from "styled-components";
import { MdInfo } from "react-icons/md";
import { useContext } from "react";
import { ObjCtx } from "components/logical/ObjectProvider";
import InspectorRender from "./InspectorRender";

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

export default function PropsInspector() {
  const { selectedList } = useContext(ObjCtx);

  return (
    <Root onMouseDown={(e) => e.stopPropagation()}>
      <Title>
        <MdInfo /> Property
      </Title>
      <HR />
      {selectedList.length === 1 && <InspectorRender id={selectedList[0]} />}
    </Root>
  );
}
