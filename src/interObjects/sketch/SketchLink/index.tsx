import styled from "styled-components";
import LocBase from "interObjects/struct/LocBase";
import useData from "hooks/useData";
import { SketchLinkData } from "../../define/data";
import ContentEditable from "react-contenteditable";
import { FC, useEffect, useRef, useState } from "react";
import { InterObjectComponentProps } from "interObjects/define/interObject";
import useObject from "hooks/useObject";
import Frame from "interObjects/struct/Frame";
import getInfo from "utils/getInfo";
import { Image } from "@mui/icons-material";
import { MdLink } from "react-icons/md";

const SketchLink: FC<InterObjectComponentProps> = ({
  id,
  x,
  y,
  selected,
}: InterObjectComponentProps) => {
  const { select } = useObject(id);
  const { data: rawData, modify } = useData(id);
  const data = rawData as SketchLinkData;
  const titleRef = useRef<HTMLAnchorElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  const [loading, setLoading] = useState(false);
  const [attempt, setAttempt] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  function fetch(link: string) {
    getInfo(link).then((data) => {
      setTitle(data.title || "");
      setDesc(data.description || "");
      setImage(data.image || "");
      setLoading(false);
    });
  }

  useEffect(() => {
    if (!data?.link || data?.simple) return;
    setLoading(true);
    if (!attempt) {
      fetch(data.link);
      setAttempt(true);
      return;
    }
    const timeout = setTimeout(async () => {
      fetch(data.link);
    }, 1000);

    setTitle("");
    setDesc("");
    setImage("");
    return () => clearTimeout(timeout);
  }, [data?.link, data?.simple]);

  useEffect(() => {
    setTimeout(() => {
      if (titleRef.current) {
        setWidth(titleRef.current.clientWidth);
      }
    }, 100);
  }, [title, desc, image, data?.size]);

  if (!data) return null;

  return (
    <LocBase id={id} x={x} y={y}>
      <Frame id={id}>
        <div style={{ padding: "10px", backgroundColor: "#f8f8f8" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {image && !data.simple && data.image && (
              <img
                src={image}
                alt=""
                style={{ height: data.size * 4, marginTop: 5 }}
              />
            )}
            <div>
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                  color: "#008eb9",
                }}
              >
                {(!image || data.simple) && <MdLink size={data.size * 1.2} />}
                <a
                  target="_blank"
                  rel="noreferrer"
                  ref={titleRef}
                  style={{
                    display: "block",
                    whiteSpace: "nowrap",
                    color: "#008eb9",
                    fontSize: data.size,
                  }}
                  href={data.link}
                >
                  {(!data.simple && title) || data.link}
                </a>
                {loading && !data?.simple && (
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                )}
              </div>
              {!data.simple && data.description && (
                <div
                  ref={infoRef}
                  style={{
                    fontSize: data.size * 0.8,
                    width: Math.max(width, 400),
                  }}
                >
                  {desc}
                </div>
              )}
            </div>
          </div>
        </div>
      </Frame>
    </LocBase>
  );
};

export default SketchLink;
