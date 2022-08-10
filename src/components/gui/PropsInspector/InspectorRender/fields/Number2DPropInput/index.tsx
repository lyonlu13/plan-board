import styled from "styled-components";
import { Number2DPropField } from "interObjects/define/propField";
import { useEffect, useRef } from "react";
import { InterObjectData } from "interObjects/define/interObject";
import { cloneDeep } from "lodash";

const Root = styled.div`
  display: flex;
  gap: 5px;
`;
const Input = styled.input`
  -moz-appearance: textfield;
  border-radius: 5px;
  outline: none;
  border: none;
  width: 60px;
  padding: 5px;
  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default function Number2DPropInput({
  data,
  values,
  onChange,
  numberField,
}: Props) {
  const ref1 = useRef<HTMLInputElement | null>(null);
  const ref2 = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    function onMousewheel0(event: any) {
      event.stopImmediatePropagation();
      event.preventDefault();
      let newValues = cloneDeep(values);
      if (event.wheelDelta <= -120) newValues[0] -= 1;
      else if (event.wheelDelta >= 120) newValues[0] += 1;
      onChange(newValues);
    }
    function onMousewheel1(event: any) {
      event.stopImmediatePropagation();
      event.preventDefault();
      let newValues = values;
      if (event.wheelDelta <= -120) newValues[1] -= 1;
      else if (event.wheelDelta >= 120) newValues[1] += 1;
      onChange(newValues);
    }
    ref1.current?.addEventListener("mousewheel", onMousewheel0, {
      passive: false,
    });
    ref2.current?.addEventListener("mousewheel", onMousewheel1, {
      passive: false,
    });
    return () => {
      ref1.current?.removeEventListener("mousewheel", onMousewheel0, false);
      ref2.current?.removeEventListener("mousewheel", onMousewheel1, false);
    };
  }, [values, data]);

  return (
    <Root>
      {numberField.desc1}
      <Input
        ref={ref1}
        type="number"
        value={values[0] || ""}
        onChange={(e) => onChange([parseInt(e.target.value), values[1]])}
        onKeyDown={(e) => e.stopPropagation()}
        onPaste={(e) => e.stopPropagation()}
      />
      {numberField.midSymbol}
      <Input
        ref={ref2}
        type="number"
        value={values[1] || ""}
        onChange={(e) => onChange([values[0], parseInt(e.target.value)])}
        onKeyDown={(e) => e.stopPropagation()}
        onPaste={(e) => e.stopPropagation()}
      />
      {numberField.desc2}
    </Root>
  );
}

interface Props {
  data: InterObjectData;
  values: number[];
  onChange: (value: number[]) => void;
  numberField: Number2DPropField;
}
