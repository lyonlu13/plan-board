import { BoardCtx } from "components/logical/BoardProvider";
import React, { useContext } from "react";
import { MdDoubleArrow } from "react-icons/md";
import styled from "styled-components";

const Root = styled.div`
  background-color: #464646;
  color: white;
  font-size: 20px;
  height: 50px;
  padding: 0 10px;
  z-index: 2;
  border-radius: 10px;
  transition: 0.3s;
  padding: 10px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  text-align: left;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #c2c2c2;
    color: #464646;
  }
`;

export default function BoardList() {
  const { boardList, boards, current } = useContext(BoardCtx);

  return (
    <Root>
      {boardList.map((id) => {
        const selected = id === current;
        return (
          <Item key={id}>
            <MdDoubleArrow style={{ opacity: selected ? 1 : 0 }} />
            {boards[id].name}
          </Item>
        );
      })}
    </Root>
  );
}
