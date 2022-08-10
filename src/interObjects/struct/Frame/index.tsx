import useAppearance from "hooks/useAppearance";
import useGeo from "hooks/useGeo";
import useObject from "hooks/useObject";
import useViewPort from "hooks/useViewPort";
import { MouseEventHandler, ReactNode, useRef } from "react";
import styled from "styled-components";

const FrameRoot = styled.div`
  transition: 0.2s;
  &:hover {
    box-shadow: 0 0 4px 2px #009faa;
  }
  text-align: left;
`;
interface Props {
  radius?: boolean;
  padding?: number;
  id: string;
  children: ReactNode;
  onDoubleClick?: MouseEventHandler;
}

export default function Frame({
  radius,
  padding,
  id,
  children,
  onDoubleClick,
}: Props) {
  const { object, selected } = useObject(id);

  return (
    <FrameRoot
      style={{
        borderRadius: radius ? 5 : 0,
        padding: padding,
        boxShadow: object.locked
          ? "none"
          : selected
          ? "0 0 4px 2px #009faa"
          : undefined,
        cursor: object.locked ? "auto" : "move",
      }}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </FrameRoot>
  );
}
