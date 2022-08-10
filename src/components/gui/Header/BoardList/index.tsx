import { BoardCtx } from "components/logical/BoardProvider";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MdAdd, MdClose, MdSearch } from "react-icons/md";
import styled from "styled-components";

const Root = styled.div`
  background-color: #464646;
  color: white;
  height: 200px;
  z-index: 2;
  border-radius: 10px;
  transition: 0.3s;
  width: 280px;
  overflow: hidden;
`;

const Wrapper = styled.div`
  padding: 10px;
`;

const List = styled.div`
  overflow: auto;
  height: 350px;
  padding-right: 5px;
`;

const Item = styled.div`
  padding: 0 5px;
  font-size: 18px;
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
  &.selected {
    background-color: #c2c2c2;
    color: #464646;
  }
`;

const ToolBar = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 5px;
  gap: 10px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background: white;
  padding: 0px 5px;
  font-size: 20px;
  border-radius: 5px;
  & input {
    outline: none;
    background: none;
    border: none;
  }
`;

const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff60;
  transition: 0.3s;
  cursor: pointer;
  font-size: 24px;
  &:hover {
    color: #ffffff80;
  }
  &:active {
    color: white;
  }
`;

const Hover = styled.a`
  transition: 0.3s;
  color: #1c1c1c;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;

export default function BoardList({ open }: Props) {
  const { boardList, boards, current, newBoard, setCurrent } =
    useContext(BoardCtx);

  const ref = useRef<HTMLDivElement | null>(null);

  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    const onMousewheel: EventListener = (event: any) => {
      event.stopPropagation();
    };
    const target = ref.current;
    target?.addEventListener("mousewheel", onMousewheel, false);

    return () => {
      target?.removeEventListener("mousewheel", onMousewheel, false);
    };
  }, []);

  return (
    <Root
      style={{
        height: open ? 400 : 0,
      }}
    >
      <Wrapper>
        <ToolBar>
          <SearchBox>
            <MdSearch color="#1c1c1c" />
            <input
              value={searchStr}
              onChange={(e) => setSearchStr(e.target.value)}
              type="text"
            />
            <Hover
              style={{
                opacity: searchStr ? 1 : 0,
                pointerEvents: searchStr ? "auto" : "none",
              }}
              onClick={() => setSearchStr("")}
            >
              <MdClose size={18} />
            </Hover>
          </SearchBox>
          <Button onClick={() => newBoard(searchStr)}>
            <MdAdd />
          </Button>
        </ToolBar>
        <List ref={ref}>
          {boardList.map((id) => {
            if (!boards[id]) return null;
            const selected = id === current;
            if (
              boards[id].name
                .toLocaleLowerCase()
                .includes(searchStr.toLocaleLowerCase())
            )
              return (
                <Item
                  className={selected ? "selected" : ""}
                  key={id}
                  onClick={() => setCurrent(id)}
                >
                  {boards[id].name}
                </Item>
              );
          })}
        </List>
      </Wrapper>
    </Root>
  );
}

interface Props {
  open: boolean;
}
