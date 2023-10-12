import useAppearance from "hooks/useAppearance";
import useGeo from "hooks/useGeo";
import useObject from "hooks/useObject";
import { ReactNode, useRef } from "react";
import styled from "styled-components";

const Root = styled.div`
  transform-origin: top left;
  z-index: 1;
  height: fit-content;
  width: fit-content;
`;

interface Props {
  id: string;
  x: number;
  y: number;
  children: ReactNode;
}

export default function LocBase({ id, x, y, children }: Props) {
  const { zoom, offsetX, offsetY } = useGeo();
  const { geoTransition } = useAppearance();
  const { select, startDrag, stopDrag, selectedList, selected, object } =
    useObject(id);
  const clickDetect = useRef(0);

  return (
    <Root
      id={`inter-obj-${id}`}
      onMouseDown={(e) => {
        const tmp = document.createElement("input");
        document.body.appendChild(tmp);
        tmp.focus();
        document.body.removeChild(tmp);
        e.stopPropagation();
        e.preventDefault();
        if (object.locked) return;
        if (selected || !selectedList.length) {
          startDrag(id);
          select(true);
        } else if (selectedList.length) {
          startDrag(id);
          select();
        }
        clickDetect.current = new Date().getTime();
      }}
      onMouseUp={(e) => {
        if (object.locked) return;
        if (new Date().getTime() - clickDetect.current < 200) {
          select();
        }
        stopDrag();
      }}
      style={{
        position: object.position,
        left: object.position === "relative" ? undefined : offsetX + x * zoom,
        top: object.position === "relative" ? undefined : offsetY + y * zoom,
        transform:
          object.position === "relative" ? undefined : `scale(${zoom})`,
        transition: `${
          geoTransition ? "0.3s all," : ""
        }  0.2s box-shadow, opacity 0.3s`,
        opacity: object.visibility ? 1 : 0,
        pointerEvents: !object.visibility || object.locked ? "none" : "auto",
      }}
    >
      {children}
    </Root>
  );
}
