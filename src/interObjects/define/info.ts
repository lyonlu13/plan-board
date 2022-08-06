import BlockText from "interObjects/block/BlockText";
import {
  InterObjectInfo,
  ObjectType,
  ProcessorInfo,
} from "interObjects/define/interObject";
import {
  ImagePropField,
  Number2DPropField,
  NumberPropField,
  PropFieldType,
  SelectPropField,
  TextPropField,
  ToggleGroupPropField,
} from "interObjects/define/propField";
import SketchIcon from "interObjects/sketch/SketchIcon";
import SketchImage from "interObjects/sketch/SketchImage";
import SketchLink from "interObjects/sketch/SketchLink";
import SketchText from "interObjects/sketch/SketchText";
import Processor from "interObjects/struct/Processor";

export const SketchTextInfo: InterObjectInfo = new InterObjectInfo(
  ObjectType.Sketch,
  "SketchText"
)
  .prop({
    type: PropFieldType.Number,
    label: "Width",
    round: 0,
    unit: "px",
    caseTo: "maxWidth",
  } as NumberPropField)
  .prop({
    type: PropFieldType.Number,
    label: "Size",
    round: 0,
    adjustBtn: true,
    unit: "px",
    caseTo: "size",
    limit: {
      min: 12,
    },
  } as NumberPropField)
  .prop({
    type: PropFieldType.Select,
    label: "Font",
    isFont: true,
    caseTo: "font",
  } as SelectPropField)
  .prop({
    type: PropFieldType.ToggleGroup,
    label: "Style",
    items: [
      { icon: "MdFormatBold", tip: "Bold" },
      { icon: "MdFormatItalic", tip: "Italic" },
    ],
    caseTo: "style.bold|style.italic",
  } as ToggleGroupPropField)
  .prop({
    type: PropFieldType.ToggleGroup,
    label: "Align",
    items: [
      { icon: "MdFormatAlignLeft", tip: "Left" },
      { icon: "MdFormatAlignCenter", tip: "Center" },
      { icon: "MdFormatAlignJustify", tip: "Justify" },
      { icon: "MdFormatAlignRight", tip: "Right" },
    ],
    caseTo: "align.left|align.center|align.justify|align.right",
    unique: true,
  } as ToggleGroupPropField)
  .prop({
    type: PropFieldType.ToggleGroup,
    label: "Line",
    items: [
      { icon: "TbOverline", tip: "Overline" },
      { icon: "TbStrikethrough", tip: "Strikethrough" },
      { icon: "TbUnderline", tip: "Underline" },
    ],
    caseTo: "line.over|line.through|line.under",
  } as ToggleGroupPropField)
  .prop({
    type: PropFieldType.Color,
    label: "Foreground Color",
    caseTo: "color.foreground",
  })
  .prop({
    type: PropFieldType.Color,
    label: "Background Color",
    caseTo: "color.background",
  })
  .prop({
    type: PropFieldType.Check,
    label: "Permanent",
    caseTo: "permanent",
  })
  .prop({
    type: PropFieldType.Text,
    label: "Text",
    placeholder: "",
    multiline: true,
    caseTo: "text",
  } as TextPropField)
  .bind(SketchText)
  .setIcon("MdTextFormat")
  .setDisplayName("Sketch Text")
  .setDescription("For general text expression");

export const SketchImageInfo: InterObjectInfo = new InterObjectInfo(
  ObjectType.Sketch,
  "SketchImage"
)
  .prop({
    type: PropFieldType.Number2D,
    label: "Size",
    desc1: "W",
    desc2: "H",
    midSymbol: "X",
    caseTo: "dim.width|dim.height",
  } as Number2DPropField)
  .prop({
    type: PropFieldType.ToggleGroup,
    label: "Resize Mode",
    items: [
      { icon: "TbForbid", tip: "None" },
      { icon: "CgArrowsExpandLeft", tip: "Both" },
      { icon: "TbArrowsHorizontal", tip: "Horizontal" },
      { icon: "TbArrowsVertical", tip: "Vertical" },
    ],
    unique: true,
    caseTo:
      "dim.resizeMode.none|dim.resizeMode.both|dim.resizeMode.h|dim.resizeMode.v",
  } as ToggleGroupPropField)
  .prop({
    type: PropFieldType.ToggleGroup,
    label: "Flip",
    items: [
      { icon: "TbFlipHorizontal", tip: "Horizontal" },
      { icon: "TbFlipVertical", tip: "Vertical" },
    ],
    caseTo: "flip.h|flip.v",
  } as ToggleGroupPropField)
  .prop({
    type: PropFieldType.Image,
    label: "Image Source",
    caseTo: "source",
  } as ImagePropField)
  .bind(SketchImage)
  .setIcon("MdImage")
  .setDisplayName("Sketch Image")
  .setDescription("For displaying image");

export const SketchIconInfo: InterObjectInfo = new InterObjectInfo(
  ObjectType.Sketch,
  "SketchIcon"
)
  .prop({
    type: PropFieldType.Text,
    label: "Icon",
    caseTo: "icon",
  } as TextPropField)
  .prop({
    type: PropFieldType.Number,
    label: "Size",
    round: 0,
    caseTo: "size",
  } as NumberPropField)
  .prop({
    type: PropFieldType.Color,
    label: "Color",
    caseTo: "color",
  })
  .bind(SketchIcon)
  .setIcon("MdEmojiEmotions")
  .setDisplayName("Sketch Icon")
  .setDescription("For displaying icons");

export const SketchLinkInfo: InterObjectInfo = new InterObjectInfo(
  ObjectType.Sketch,
  "SketchLink"
)
  .prop({
    type: PropFieldType.Text,
    label: "Link",
    caseTo: "link",
  })
  .prop({
    type: PropFieldType.Number,
    label: "Size",
    caseTo: "size",
  })
  .prop({
    type: PropFieldType.Check,
    label: "Simple Link",
    caseTo: "simple",
  })
  .prop({
    type: PropFieldType.Check,
    label: "Image",
    caseTo: "image",
  })
  .prop({
    type: PropFieldType.Check,
    label: "Description",
    caseTo: "description",
  })
  .bind(SketchLink)
  .setIcon("MdLink")
  .setDisplayName("Sketch Link")
  .setDescription("Link");

export const BlockTextInfo: InterObjectInfo = new InterObjectInfo(
  ObjectType.Block,
  "BlockText"
)
  .prop({
    type: PropFieldType.Number,
    label: "Width",
    round: 0,
    unit: "px (Low to 200px)",
    caseTo: "maxWidth",
  } as NumberPropField)
  .prop({
    type: PropFieldType.Text,
    label: "Text",
    placeholder: "",
    multiline: true,
    caseTo: "text",
  } as TextPropField)
  .bind(BlockText)
  .setIcon("MdTextFormat")
  .setDisplayName("Block Text")
  .setDescription("For processable text");

export const ProcessorTextCountInfo: ProcessorInfo = new ProcessorInfo(
  ObjectType.Processor,
  "ProcessorTextCount"
)
  .input(0, "Text")
  .output(0, "Length")
  .output(1, "Words")
  .setIcon("AiOutlineFieldNumber")
  .setDisplayName("Text Count")
  .setDescription("Calculate the words count and character count in the text");

export const ProcessorConcatInfo: ProcessorInfo = new ProcessorInfo(
  ObjectType.Processor,
  "ProcessorConcat"
)
  .input(0, "Text1")
  .input(1, "Text2")
  .output(0, "Text")
  .prop({
    type: PropFieldType.Text,
    label: "Delimiter",
    placeholder: "Added between two sequences",
    caseTo: "delimiter",
  } as TextPropField)
  .setIcon("AiOutlineMergeCells")
  .setDisplayName("Processor Concat")
  .setDescription("Concat two sequences");

export const ProcessorArrayInfo: ProcessorInfo = new ProcessorInfo(
  ObjectType.Processor,
  "ProcessorArray"
)
  .dp()
  .prop({
    type: PropFieldType.Number,
    label: "Count",
    caseTo: "count",
  } as NumberPropField)
  .setIcon("VscSymbolArray")
  .setDisplayName("Processor Array")
  .setDescription("Generate array");

export const ProcessorJoinInfo: ProcessorInfo = new ProcessorInfo(
  ObjectType.Processor,
  "ProcessorJoin"
)
  .input(0, "Array")
  .output(0, "Text")
  .prop({
    type: PropFieldType.Text,
    label: "Delimiter",
    placeholder: "Added between two sequences",
    caseTo: "delimiter",
  } as TextPropField)
  .setIcon("AiOutlineMergeCells")
  .setDisplayName("Processor Join")
  .setDescription("Join array items");

export const ProcessorSplitInfo: ProcessorInfo = new ProcessorInfo(
  ObjectType.Processor,
  "ProcessorSplit"
)
  .input(0, "Text")
  .output(0, "Array")
  .prop({
    type: PropFieldType.Text,
    label: "Delimiter",
    placeholder: "Split sequence with",
    caseTo: "delimiter",
  } as TextPropField)
  .setIcon("AiOutlineSplitCells")
  .setDisplayName("Processor Split")
  .setDescription("Split text");
