import styled from "styled-components";
import { NumberPropField, TextPropField } from "interObjects/define/propField";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useEffect, useRef } from "react";
import { InterObjectData } from "interObjects/define/interObject";

const Input = styled.input`
  -moz-appearance: textfield;
  border-radius: 5px;
  outline: none;
  border: none;
  width: 60px;
  margin-right: 5px;
  padding: 5px;
  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default function NumberPropInput({
  data,
  value,
  onChange,
  numberField,
}: Props) {
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const onMousewheel: EventListener = (event: any) => {
      event.stopImmediatePropagation();
      event.preventDefault();
      let newValue = value;
      if (event.wheelDelta <= -120) newValue -= 1;
      else if (event.wheelDelta >= 120) newValue += 1;
      onChange(newValue);
    };
    ref.current?.addEventListener("mousewheel", onMousewheel, {
      passive: false,
    });
    return () => {
      ref.current?.removeEventListener("mousewheel", onMousewheel, false);
    };
  }, [ref.current, value, data]);

  return (
    <div>
      <Input
        ref={ref}
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        onKeyDown={(e) => e.stopPropagation()}
        onPaste={(e) => e.stopPropagation()}
      />
      {numberField.unit}
    </div>
  );
}

interface Props {
  data: InterObjectData;
  value: number;
  onChange: (value: number) => void;
  numberField: NumberPropField;
}
