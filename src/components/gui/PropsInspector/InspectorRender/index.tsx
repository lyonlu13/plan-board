import styled from "styled-components";
import { SketchImageInfo, SketchTextInfo } from "interObjects/define/info";
import { InterObjectInfo } from "interObjects/define/interObject";
import {
  ImagePropField,
  Number2DPropField,
  NumberPropField,
  PropFieldType,
  SelectPropField,
  TextPropField,
  ToggleGroupPropField,
} from "interObjects/define/propField";
import useObject from "hooks/useObject";
import useData, { MultiCast } from "hooks/useData";
import NumberPropInput from "./fields/NumberPropInput";
import TextPropInput from "./fields/TextPropInput";
import SelectPropInput from "./fields/SelectPropInput";
import ColorPropInput from "./fields/ColorPropInput";
import ToggleGroupPropInput, {
  ToggleGroupValue,
} from "./fields/ToggleGroupPropInput";
import { useEffect, useRef } from "react";
import Number2DPropInput from "./fields/Number2DPropInput";
import ImagePropInput from "./fields/ImagePropInput";
import { LookupInterObjs } from "interObjects/define/lookup";

const Root = styled.div`
  width: 100%;
  height: 40vh;
  overflow-y: auto;
`;

const Content = styled.div`
  width: calc(100% - 12px);
`;

const FieldFrame = styled.div`
  text-align: left;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Lab = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 500;
  user-select: none;
`;

export default function InspectorRender({ id }: Props) {
  const { object } = useObject(id);
  const { data, modify, multiModify } = useData(id);
  const info: InterObjectInfo = LookupInterObjs[object?.subname];
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMousewheel: EventListener = (event: any) => {
      event.stopPropagation();
    };
    const target = ref.current;
    target?.addEventListener("mousewheel", onMousewheel, false);

    return () => {
      target?.removeEventListener("mousewheel", onMousewheel, false);
    };
  }, []);

  return (
    <Root ref={ref}>
      <Content>
        <FieldFrame>
          <Lab>Name</Lab>
          <TextPropInput
            textField={{
              label: "name",
              type: PropFieldType.Text,
              placeholder: "",
              caseTo: "name",
            }}
            value={data?.name || ""} // innerHTML of the editable div
            onChange={(e) => modify("name", e.target.value)}
          />
        </FieldFrame>
        {info &&
          data &&
          info.propFields.map((field, key) => (
            <FieldFrame key={"prop" + key}>
              <Lab>{field.label}</Lab>
              {(() => {
                switch (field.type) {
                  case PropFieldType.Text: {
                    const textField = field as TextPropField;
                    return (
                      <TextPropInput
                        textField={textField}
                        value={data.getProp(field.caseTo)} // innerHTML of the editable div
                        onChange={(e) => modify(field.caseTo, e.target.value)}
                      />
                    );
                  }
                  case PropFieldType.Number: {
                    const numberField = field as NumberPropField;
                    return (
                      <NumberPropInput
                        data={data}
                        value={data.getProp(field.caseTo) as number}
                        onChange={(value) => modify(field.caseTo, value)}
                        numberField={numberField}
                      />
                    );
                  }
                  case PropFieldType.Select: {
                    const selectField = field as SelectPropField;
                    return (
                      <SelectPropInput
                        value={data.getProp(field.caseTo)}
                        onChange={(val) => {
                          modify(field.caseTo, val);
                        }}
                        selectField={selectField}
                      />
                    );
                  }
                  case PropFieldType.Color: {
                    return (
                      <ColorPropInput
                        value={data.getProp(field.caseTo)}
                        onChange={(val) => {
                          modify(field.caseTo, val);
                        }}
                      />
                    );
                  }
                  case PropFieldType.ToggleGroup: {
                    const toggleGroupField = field as ToggleGroupPropField;
                    let casting = toggleGroupField.caseTo.split("|");
                    let values: ToggleGroupValue = {};
                    casting.forEach((c) => {
                      values[c] = data.getProp(c);
                    });
                    return (
                      <ToggleGroupPropInput
                        values={values}
                        onChange={(mod) => {
                          multiModify(mod);
                        }}
                        toggleGroupField={toggleGroupField}
                      />
                    );
                  }
                  case PropFieldType.Check: {
                    return (
                      <input
                        type="checkbox"
                        checked={data.getProp(field.caseTo)}
                        onChange={(e) => {
                          modify(field.caseTo, !data.getProp(field.caseTo));
                        }}
                      />
                    );
                  }
                  case PropFieldType.Number2D: {
                    const number2DField = field as Number2DPropField;
                    const casting = number2DField.caseTo.split("|");
                    const values2D: number[] = [];
                    casting.forEach((c) => {
                      values2D.push(data.getProp(c));
                    });
                    return (
                      <Number2DPropInput
                        data={data}
                        values={values2D}
                        onChange={(values) => {
                          const mod: MultiCast = {};
                          casting.forEach((c, i) => {
                            mod[c] = values[i];
                          });
                          multiModify(mod);
                        }}
                        numberField={number2DField}
                      />
                    );
                  }
                  case PropFieldType.Image: {
                    const imageField = field as ImagePropField;

                    return (
                      <ImagePropInput
                        value={data.getProp(imageField.caseTo)}
                        imageField={imageField}
                        onChange={(source) => {
                          multiModify({
                            "source.sourceStr": source.sourceStr,
                            "source.type": source.type,
                            "dim.width": source.w,
                            "dim.height": source.h,
                          });
                        }}
                      />
                    );
                  }
                }
                return <div></div>;
              })()}
            </FieldFrame>
          ))}
      </Content>
    </Root>
  );
}

interface Props {
  id: string;
}
