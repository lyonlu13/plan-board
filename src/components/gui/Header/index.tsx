import useViewPort from "hooks/useViewPort";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { HiMenu } from "react-icons/hi";
import {
  MdArrowDropDown,
  MdControlCamera,
  MdZoomIn,
  MdZoomOut,
} from "react-icons/md";
import AutosizeInput from "react-input-autosize";
import useGeo from "hooks/useGeo";
import useAppearance from "hooks/useAppearance";
import Icon from "components/common/Icon";
import { BoardCtx } from "components/logical/BoardProvider";
import BoardList from "./BoardList";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: fixed;
  z-index: 2;
  left: 15px;
  top: 15px;
`;

const Column = styled.div`
  display: flex;
  gap: 15px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  align-items: center;
  background-color: #464646;
  color: white;
  height: 50px;
  padding: 0 10px;
  z-index: 2;
  border-radius: 10px;
  transition: 0.3s;
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

const TitleText = styled.div`
  font-size: 20px;
  padding: 0 5px;
  background-color: transparent;
  transition: 0.3s;
  user-select: none;
  &:hover {
    background-color: #ffffff67;
  }
`;
const GeoTools = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  font-size: 20px;
  align-items: center;
  background-color: #464646;
  color: white;
  height: 50px;
  padding: 0 10px;
  z-index: 2;
  border-radius: 10px;
  transition: 0.3s;
`;

export default function Header() {
  const { zoom, zoomTo, setOffset } = useGeo();
  const { setGeoTransition } = useAppearance();
  const { vw, vh } = useViewPort();

  const [input, setInput] = useState("New Plan");
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [menu, setMenu] = useState(false);

  const { current, boards, setTitle } = useContext(BoardCtx);
  const board = boards[current];
  useEffect(() => {
    if (editing) {
      inputRef.current?.select();
    } else {
      if (input.length) setTitle(input);
      else setInput(board.name);
    }
  }, [editing]);

  useEffect(() => {
    if (boards[current].name && boards[current].name !== input)
      setInput(boards[current].name);
  }, [board.name]);

  return (
    <Root onMouseDown={(e) => e.stopPropagation()}>
      <Column>
        <Title>
          <Button
            style={{
              marginRight: 10,
            }}
            onClick={() => setMenu(!menu)}
          >
            <HiMenu />
          </Button>
          {editing ? (
            <AutosizeInput
              inputRef={(ref) => {
                inputRef.current = ref;
              }}
              inputStyle={{
                fontSize: 20,
                outline: "none",
              }}
              onBlur={() => setEditing(false)}
              value={input}
              onChange={function (event) {
                setInput(event.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
          ) : (
            <TitleText onClick={() => setEditing(true)}>{board.name}</TitleText>
          )}
        </Title>
        <GeoTools>
          <Button
            data-tip="Zoom Out"
            onClick={() => {
              setGeoTransition(true);
              zoomTo(zoom - 0.2);
              setTimeout(() => {
                setGeoTransition(false);
              }, 300);
            }}
          >
            <MdZoomOut />
          </Button>
          <Button
            data-tip="Center the view"
            onClick={() => {
              setGeoTransition(true);
              zoomTo(1, vw / 2, vh / 2);
              setOffset(vw / 2, vh / 2);
              setTimeout(() => {
                setGeoTransition(false);
              }, 300);
            }}
          >
            <MdControlCamera />
          </Button>
          <Button
            data-tip="Zoom In"
            onClick={() => {
              setGeoTransition(true);
              zoomTo(zoom + 0.2);
              setTimeout(() => {
                setGeoTransition(false);
              }, 300);
            }}
          >
            <MdZoomIn />
          </Button>
          <Icon icon="Md" color="red" size={24} />
        </GeoTools>
      </Column>
      <BoardList open={menu} />
    </Root>
  );
}
