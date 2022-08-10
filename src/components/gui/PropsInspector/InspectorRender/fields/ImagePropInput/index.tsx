import styled from "styled-components";
import { ImagePropField, TextPropField } from "interObjects/define/propField";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { ImageSource } from "interObjects/define/data";
import Icon from "components/common/Icon";
import Model from "components/common/Model";
import { useContext, useEffect, useRef, useState } from "react";
import { MediaCtx } from "components/logical/MediaProvider";
import urlToBlob from "utils/urlToBlob";

const Label = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  margin-bottom: 5px;
  text-overflow: ellipsis;
`;

const Button = styled.div`
  display: inline-block;
  background-color: gray;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: darkgray;
  }
`;

const Input = styled.input`
  border-radius: 5px;
  outline: none;
  border: none;
  width: 100%;
  margin-right: 5px;
  padding: 5px;
`;

export default function ImagePropInput({ value, onChange, imageField }: Props) {
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const [valid, setValid] = useState(false);
  const [persist, setPersist] = useState(false);
  const [name, setName] = useState("");
  const dim = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const { newImage } = useContext(MediaCtx);

  useEffect(() => {
    if (url === "") return;
    let timeout = 2000;
    let timedOut = false,
      timer: NodeJS.Timeout;
    let img = new Image();
    img.onerror = img.onabort = function () {
      if (!timedOut) {
        clearTimeout(timer);
        setValid(false);
      }
    };
    img.onload = function () {
      if (!timedOut) {
        clearTimeout(timer);
        setValid(true);
        dim.current = { w: img.width, h: img.height };
      }
    };
    img.src = url;
    timer = setTimeout(function () {
      timedOut = true;
      img.src = "//!!!!/test.jpg";
      setValid(false);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [url]);

  function close() {
    setShow(false);
    setUrl("");
    setValid(false);
  }

  return (
    <div>
      <Label>
        <span style={{ marginRight: 5 }}>
          <Icon
            style={{ display: "block" }}
            size={16}
            color="white"
            icon={
              { none: "TbForbid", url: "MdLink", store: "TbBox" }[value.type]
            }
          />
        </span>
        {value.sourceStr}
      </Label>
      <Button onClick={() => setShow(true)}>Select</Button>
      <Model
        show={show}
        setShow={() => close()}
        title={"Image Picker"}
        icon={"MdImage"}
      >
        <div
          style={{
            display: "flex",
            gap: "5px",
          }}
        >
          <Icon icon="MdLink" />
          <Input
            placeholder="Image URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
          />
        </div>
        {valid && (
          <div
            style={{
              display: "flex",
              gap: "5px",
              marginTop: 5,
            }}
          >
            <label htmlFor="persist_check">
              <input
                id="persist_check"
                type="checkbox"
                checked={persist}
                onChange={(e) => setPersist(!persist)}
              />
              Persist to local
            </label>
            {persist && (
              <Input
                style={{ width: 200 }}
                placeholder="Image name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
              />
            )}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
          }}
        >
          {valid ? (
            <img
              style={{
                minHeight: 200,
              }}
              src={url}
              alt=""
              width={"80%"}
            />
          ) : (
            url && "It is not a valid image URL."
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: 10,
            gap: 10,
          }}
        >
          <Button onClick={() => close()}>Cancel</Button>
          <Button
            style={{
              filter: valid ? "" : "brightness(.6)",
              pointerEvents: valid ? "auto" : "none",
            }}
            onClick={() => {
              if (persist) {
                urlToBlob(url).then((blob) => {
                  newImage("New Name", blob).then((id) => {
                    onChange({
                      type: "store",
                      sourceStr: id,
                      w: dim.current.w,
                      h: dim.current.h,
                    });
                  });
                });
              } else {
                onChange({
                  type: "url",
                  sourceStr: url,
                  w: dim.current.w,
                  h: dim.current.h,
                });
              }
              close();
            }}
          >
            Finish
          </Button>
        </div>
      </Model>
    </div>
  );
}

interface Props {
  value: ImageSource;
  onChange: (s: ImageSourceMutation) => void;
  imageField: ImagePropField;
}

interface ImageSourceMutation extends ImageSource {
  w: number;
  h: number;
}
