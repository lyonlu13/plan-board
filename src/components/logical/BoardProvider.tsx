import { ObjectType, ProcessorInfo } from "interObjects/define/interObject";
import React, { createContext, useContext, useEffect, useState } from "react";
import { LookupInterObjs } from "interObjects/define/lookup";
import Processor from "interObjects/struct/Processor";
import { BoardContextInterface, BoardDefault } from "Contexts";
import { Board } from "define/board";
import useDB from "hooks/useDB";
import useLinearDB from "hooks/useLinearDB";
import { cloneDeep } from "lodash";
import makeId from "utils/makeId";
import { def_list } from "interObjects/define/default";

export const BoardCtx = createContext<BoardContextInterface>(BoardDefault);

export default function BoardProvider({ children }: Props) {
  const [boardList, setBoardList] = useState<string[] | null>(null);
  const [current, setCurrent] = useState<string>("default");

  const [boards, setBoards] = useState<{ [id: string]: Board }>({
    default: new Board("default", "Default Board", ["default"]),
  });

  const { data: boardsData, sync: syncBoards } = useDB<Board>(
    "board",
    "board",
    {
      key: "id",
      indexs: [],
      defaultData: [new Board("default", "Default Board", def_list)],
    },
    (data) => new Board(data.id, data.name, data.objList)
  );

  const { data: boardListData, sync: syncBoardList } = useLinearDB<string>(
    "board_list",
    {
      defaultData: ["default"],
    }
  );

  useEffect(() => {
    if (boardsData) setBoards(boardsData);
  }, [boardsData]);

  useEffect(() => {
    if (boardListData) setBoardList(boardListData);
  }, [boardListData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      syncBoards(boards);
    }, 500);

    return () => clearTimeout(timeout);
  }, [boards]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (boardList) syncBoardList(boardList);
    }, 500);

    return () => clearTimeout(timeout);
  }, [boardList]);

  function syncObjectList(list: string[]) {
    const newBoards = cloneDeep(boards);
    newBoards[current].objList = [...list];
    syncBoards(newBoards);
  }

  function setTitle(title: string) {
    const newBoards = cloneDeep(boards);
    newBoards[current].name = title;
    syncBoards(newBoards);
  }

  function newBoard(title?: string) {
    if (!boardList) return;
    const newBoards = cloneDeep(boards);
    const board = new Board(makeId(), title || "New Board", ["default"]);
    newBoards[board.id] = board;
    syncBoards(newBoards);
    const newBoardList = [...boardList, board.id];
    syncBoards(newBoards);
    syncBoardList(newBoardList);
    setBoards(newBoards);
    setBoardList(newBoardList);
    setCurrent(board.id);
  }

  return (
    <>
      <BoardCtx.Provider
        value={{
          current,
          setCurrent,
          boardList: boardList || [],
          boards,
          syncObjectList,
          setTitle,
          newBoard,
        }}
      >
        {boards && children}
      </BoardCtx.Provider>
    </>
  );
}

interface Props {
  children: React.ReactNode;
}
