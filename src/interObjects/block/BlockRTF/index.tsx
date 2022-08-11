import useData from "hooks/useData";
import { BlockRTFData } from "../../define/data";
import ContentEditable from "react-contenteditable";
import { FC, useEffect, useRef, useState } from "react";
import { InterObjectComponentProps } from "interObjects/define/interObject";
import useObject from "hooks/useObject";
import Block from "interObjects/struct/Block";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import katex from "katex";
import "katex/dist/katex.min.css";
(window as any).katex = katex;

const Editor = {
  modules: {
    toolbar: [
      [{ header: [] }, { font: [] }],
      [{ size: [] }],
      [{ color: [] }, { background: [] }],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["link", "image", "formula"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  },
  formats: [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "background",
    "color",
    "align",
    "formula",
  ],
};
const BlockRTF: FC<InterObjectComponentProps> = ({
  id,
  x,
  y,
  selected,
}: InterObjectComponentProps) => {
  const { select } = useObject(id);
  const { data: rawData, modify } = useData(id);
  const data = rawData as BlockRTFData;
  const ref = useRef<HTMLDivElement | null>(null);

  if (!data) return null;

  return (
    <Block id={id} x={x} y={y}>
      <div
        style={{
          backgroundColor: "white",
          color: "black",
          width: data.maxWidth ? Math.max(data.maxWidth, 320) : undefined,
        }}
        onMouseDown={(e) => {
          select();
          e.stopPropagation();
        }}
        onPaste={(e) => {
          e.stopPropagation();
        }}
      >
        <style>
          {`.ql-container{
            font-size: ${data.size}px;
        }`}
        </style>
        <ReactQuill
          theme="snow"
          modules={Editor.modules}
          formats={Editor.formats}
          value={data.content}
          onChange={(v) => modify("content", v)}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
        />
      </div>
    </Block>
  );
};

export default BlockRTF;
