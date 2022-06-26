import BlockText from 'interObjects/block/BlockText'
import {
  InterObjectInfo,
  ObjectType,
  ProcessorInfo,
} from 'interObjects/define/interObject'
import {
  ImagePropField,
  Number2DPropField,
  NumberPropField,
  PropFieldType,
  SelectPropField,
  TextPropField,
  ToggleGroupPropField,
} from 'interObjects/define/propField'
import SketchImage from 'interObjects/sketch/SketchImage'
import SketchText from 'interObjects/sketch/SketchText'
import Processor from 'interObjects/struct/Processor'

export const SketchTextInfo: InterObjectInfo = new InterObjectInfo(
  ObjectType.Sketch,
  'Sketch Text',
  'For general text expression',
)
  .prop({
    type: PropFieldType.Number,
    label: 'Width',
    round: 0,
    unit: 'px',
    caseTo: 'maxWidth',
  } as NumberPropField)
  .prop({
    type: PropFieldType.Number,
    label: 'Size',
    round: 0,
    adjustBtn: true,
    unit: 'px',
    caseTo: 'size',
    limit: {
      min: 12,
    },
  } as NumberPropField)
  .prop({
    type: PropFieldType.Select,
    label: 'Font',
    isFont: true,
    caseTo: 'font',
  } as SelectPropField)
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
    label: 'Align',
    items: [
      { icon: 'MdFormatAlignLeft', tip: 'Left' },
      { icon: 'MdFormatAlignCenter', tip: 'Center' },
      { icon: 'MdFormatAlignJustify', tip: 'Justify' },
      { icon: 'MdFormatAlignRight', tip: 'Right' },
    ],
    caseTo: 'align.left|align.center|align.justify|align.right',
    unique: true,
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
  .prop({
    type: PropFieldType.Text,
    label: 'Text',
    placeholder: '',
    multiline: true,
    caseTo: 'text',
  } as TextPropField)
  .bind(SketchText)

export const SketchImageInfo: InterObjectInfo = new InterObjectInfo(
  ObjectType.Sketch,
  'Sketch Image',
  'For displaying image',
)
  .prop({
    type: PropFieldType.Number2D,
    label: 'Size',
    desc1: 'W',
    desc2: 'H',
    midSymbol: 'X',
    caseTo: 'dim.width|dim.height',
  } as Number2DPropField)
  .prop({
    type: PropFieldType.ToggleGroup,
    label: 'Resize Mode',
    items: [
      { icon: 'TbForbid', tip: 'None' },
      { icon: 'CgArrowsExpandLeft', tip: 'Both' },
      { icon: 'TbArrowsHorizontal', tip: 'Horizontal' },
      { icon: 'TbArrowsVertical', tip: 'Vertical' },
    ],
    unique: true,
    caseTo:
      'dim.resizeMode.none|dim.resizeMode.both|dim.resizeMode.h|dim.resizeMode.v',
  } as ToggleGroupPropField)
  .prop({
    type: PropFieldType.ToggleGroup,
    label: 'Flip',
    items: [
      { icon: 'TbFlipHorizontal', tip: 'Horizontal' },
      { icon: 'TbFlipVertical', tip: 'Vertical' },
    ],
    caseTo: 'flip.h|flip.v',
  } as ToggleGroupPropField)
  .prop({
    type: PropFieldType.Image,
    label: 'Image Source',
    caseTo: 'source',
  } as ImagePropField)
  .bind(SketchImage)

export const BlockTextInfo: InterObjectInfo = new InterObjectInfo(
  ObjectType.Block,
  'Block Text',
  'For processable text',
)
  .prop({
    type: PropFieldType.Number,
    label: 'Width',
    round: 0,
    unit: 'px (Low to 200px)',
    caseTo: 'maxWidth',
  } as NumberPropField)
  .prop({
    type: PropFieldType.Text,
    label: 'Text',
    placeholder: '',
    multiline: true,
    caseTo: 'text',
  } as TextPropField)
  .bind(BlockText)

export const ProcessorTextCountInfo: ProcessorInfo = new ProcessorInfo(
  ObjectType.Processor,
  'Count Text',
  'Count the text',
)
  .input(0, 'Text')
  .output(0, 'Length')
  .output(1, 'Words')

export const ProcessorConcatInfo: ProcessorInfo = new ProcessorInfo(
  ObjectType.Processor,
  'Concat',
  'Concat two sequences',
)
  .input(0, 'Text1')
  .input(1, 'Text2')
  .output(0, 'Text')
  .prop({
    type: PropFieldType.Text,
    label: 'Delimiter',
    placeholder: 'Added between two sequences',
    caseTo: 'delimiter',
  } as TextPropField)
