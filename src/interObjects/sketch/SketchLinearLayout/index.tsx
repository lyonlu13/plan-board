import styled from "styled-components";
import LocBase from "interObjects/struct/LocBase";
import useData from "hooks/useData";
import { SketchLinearLayoutData, SketchRegionData } from "../../define/data";
import { FC, useContext, useEffect, useRef, useState } from "react";
import {
  InterObjectComponentProps,
  ObjectType,
} from "interObjects/define/interObject";
import useGeo from "hooks/useGeo";
import Frame from "interObjects/struct/Frame";
import { ObjCtx } from "components/logical/ObjectProvider";
import { LookupInterObjs } from "interObjects/define/lookup";
import { cloneDeep, uniq } from "lodash";
import { DataCtx } from "components/logical/DataProvider";

const Scaler = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: white;
  right: 0;
  bottom: 0;
  transition: 0.2s;
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
  &:hover {
    background-color: #009faa;
  }
`;

const SketchLinearLayout: FC<InterObjectComponentProps> = ({
  id,
  x,
  y,
  selected,
}: InterObjectComponentProps) => {
  const { data: rawData, multiModify, modify } = useData(id);
  const { datas, setDatas } = useContext(DataCtx);
  const { x: geoX, y: geoY, zoom } = useGeo();
  const data = rawData as SketchLinearLayoutData;
  const [resizing, setResizing] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastDim = useRef({ w: 0, h: 0 });

  const {
    selectedList,
    dragging,
    onDrop,
    setObjectList,
    objectList,
    objects,
    setObjects,
  } = useContext(ObjCtx);
  const [droppable, setDroppable] = useState(false);

  function validBounding(me: MouseEvent, react: DOMRect) {
    return (
      me.clientX > react.left &&
      me.clientX < react.right &&
      me.clientY > react.top &&
      me.clientY < react.bottom
    );
  }

  useEffect(() => {
    function mousemove(e: MouseEvent) {
      if (resizing) {
        e.preventDefault();
        let deltaX = e.clientX - lastPos.current.x;
        let deltaY = e.clientY - lastPos.current.y;
        deltaX /= zoom;
        deltaY /= zoom;
        const updateDim = {
          "dim.width":
            lastDim.current.w +
            (data.dim.resizeMode.h || data.dim.resizeMode.both ? deltaX : 0),
          "dim.height":
            lastDim.current.h +
            (data.dim.resizeMode.v || data.dim.resizeMode.both ? deltaY : 0),
        };
        if (e.shiftKey) {
          if (deltaX > deltaY) {
            updateDim["dim.height"] =
              lastDim.current.h *
              ((lastDim.current.w + deltaX) / lastDim.current.w);
          } else {
            updateDim["dim.width"] =
              lastDim.current.w *
              ((lastDim.current.h + deltaY) / lastDim.current.h);
          }
        }
        multiModify(updateDim);
      }

      const element = document.getElementById(`inter-obj-${id}`);

      if (element && validBounding(e, element.getBoundingClientRect())) {
        if (dragging.current) {
          setDroppable(true);
        }
      } else if (droppable) {
        setDroppable(false);
      }
    }
    function mouseup() {
      setResizing(false);
    }
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
    return () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };
  }, [resizing, droppable, objectList, objects]);

  useEffect(() => {
    if (droppable) {
      const func = () => {
        const new_objects = cloneDeep(objects);
        const new_datas = cloneDeep(datas);

        const selected = selectedList.filter((s) => s !== id);
        const new_members = [...data.members];
        new_members.push(...selected);
        new_datas[id].mutate("members", uniq(new_members));
        setObjectList(objectList.filter((o) => !selected.includes(o)));

        selected.forEach((obj) => {
          new_objects[obj].position = "relative";
          if (new_objects[obj].container && new_objects[obj].container !== id) {
            const container = new_datas[
              new_objects[obj].container
            ] as SketchLinearLayoutData;
            container.mutate(
              "members",
              uniq(container.members.filter((m) => m !== obj))
            );
          }
          new_objects[obj].container = id;
        });
        setObjects(new_objects);
        setDatas(new_datas);
      };
      onDrop.current.push([id, func]);
    } else {
      onDrop.current = onDrop.current.filter((item) => item[0] !== id);
    }
  }, [droppable, objects, datas]);

  function startResize() {
    lastPos.current = {
      x: geoX,
      y: geoY,
    };
    lastDim.current = {
      w: data.dim.width,
      h: data.dim.height,
    };
    setResizing(true);
  }

  if (!data) return null;

  let cursor = "";
  if (data.dim.resizeMode.both) cursor = "nwse-resize";
  else if (data.dim.resizeMode.h) cursor = "ew-resize";
  else if (data.dim.resizeMode.v) cursor = "ns-resize";

  let borderStyle = "";
  if (data.style.solid) borderStyle = "solid";
  else if (data.style.dashed) borderStyle = "dashed";
  else if (data.style.dotted) borderStyle = "dotted";
  else if (data.style.double) borderStyle = "double";

  let flexDirection: "row" | "column" = "row";
  if (data.align.horizontal) flexDirection = "row";
  else if (data.align.vertical) flexDirection = "column";

  return (
    <LocBase id={id} x={x} y={y}>
      <Frame id={id}>
        <div
          style={{
            display: "flex",
            width:
              data.dim.resizeMode.both || data.dim.resizeMode.h
                ? data.dim.width
                : undefined,
            height:
              data.dim.resizeMode.both || data.dim.resizeMode.v
                ? data.dim.height
                : undefined,
            borderRadius: data.radius,
            border: `${data.thick}px ${borderStyle} ${data.borderColor}`,
            backgroundColor: data.bgColor,
            boxShadow: droppable ? "0 0 4px 2px #ffd000" : undefined,
            flexDirection: flexDirection,
            minWidth: data.members.length
              ? 0
              : data.align.horizontal
              ? 200
              : 50,
            minHeight: data.members.length ? 0 : data.align.vertical ? 200 : 50,
          }}
        >
          {data.members.map((key) => {
            const obj = objects[key];
            if (!obj) return null;
            const objInfo = LookupInterObjs[obj.subname];

            if (objInfo) {
              if (obj.type === ObjectType.Sketch) {
                const Cmp = objInfo.component;
                return (
                  <Cmp
                    key={key}
                    id={key}
                    x={obj.pos.x}
                    y={obj.pos.y}
                    selected={selectedList.indexOf(key) !== -1}
                  />
                );
              } else return null;
            } else return null;
          })}
        </div>
        <Scaler
          style={{
            cursor: cursor,
            opacity: selected && !data.dim.resizeMode.none ? 1 : 0,
            pointerEvents:
              selected && !data.dim.resizeMode.none ? "auto" : "none",
          }}
          onMouseDown={(e) => {
            startResize();
            e.stopPropagation();
          }}
        />
      </Frame>
    </LocBase>
  );
};

export default SketchLinearLayout;
