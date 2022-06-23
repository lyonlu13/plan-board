import {
  InterObjectData,
  InterObjectInfo,
  ObjectType,
} from 'interObjects/define/interObject'
import {
  NumberPropField,
  PropFieldType,
  SelectPropField,
  TextPropField,
  ToggleGroupPropField,
} from 'interObjects/define/propField'

export class TextSketchData extends InterObjectData {
  text!: string
  fontSize!: number
  color!: {
    foreground: string
    background: string
  }

  loadFromJSON(json: string) {
    console.log(json)

    const obj: any = JSON.parse(json)
    this.name =
      'name' in obj && typeof obj.name === 'string' ? obj.name : 'noname'
    this.text = 'text' in obj && typeof obj.text === 'string' ? obj.text : ''
    this.fontSize =
      'fontSize' in obj && typeof obj.fontSize === 'number' ? obj.fontSize : 12
    this.color =
      'color' in obj && 'foreground' in obj.color && 'background' in obj.color
        ? obj.color
        : { foreground: 'black', background: 'transition' }
    return this
  }
}

export const TextSketchDataDefault: TextSketchData = new TextSketchData(
  'New Text',
).loadFromJSON(`
{
  "text": "",
  "fontSize": 0,
  "color": {
    "foreground": "white",
    "background": "transparent"
  }
}
`)

export const TextSketchInfo: InterObjectInfo = new InterObjectInfo(
  ObjectType.Sketch,
  'Text',
  'For general text expression',
)
  .prop({
    type: PropFieldType.Text,
    label: 'Text',
    placeholder: '',
    multiline: true,
    caseTo: 'text',
  } as TextPropField)
  .prop({
    type: PropFieldType.Number,
    label: 'Size',
    round: 0,
    adjustBtn: true,
    unit: 'px',
    caseTo: 'size',
  } as NumberPropField)
  .prop({
    type: PropFieldType.Select,
    label: 'Font',
    isFont: true,
  } as SelectPropField<string>)
  .prop({
    type: PropFieldType.ToggleGroup,
    label: 'Style',
    items: [
      { icon: 'MdFormatBold', tip: 'Bold' },
      { icon: 'MdFormatItalic', tip: 'Italic' },
    ],
    caseTo: 'style.bold|style.italic',
  } as ToggleGroupPropField)
  .prop({
    type: PropFieldType.ToggleGroup,
    label: 'Line',
    items: [
      { icon: 'TbOverline', tip: 'Overline' },
      { icon: 'TbStrikethrough', tip: 'Strikethrough' },
      { icon: 'TbUnderline', tip: 'Underline' },
    ],
    caseTo: 'line.over|line.through|line.under',
  } as ToggleGroupPropField)
  .prop({
    type: PropFieldType.Color,
    label: 'Foreground Color',
    caseTo: 'color.foreground',
  })
  .prop({
    type: PropFieldType.Color,
    label: 'Background Color',
    caseTo: 'color.background',
  })
  .prop({
    type: PropFieldType.Check,
    label: 'Permanent',
    caseTo: 'permanent',
  })
