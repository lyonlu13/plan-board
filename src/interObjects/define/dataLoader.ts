import {
  BlockRTFData,
  BlockTextData,
  ProcessorArrayData,
  ProcessorConcatData,
  ProcessorJoinData,
  ProcessorSplitData,
  ProcessorTextCountData,
  SketchIconData,
  SketchImageData,
  SketchLinkData,
  SketchRegionData,
  SketchTextData,
} from "./data";
import { InterObjectData } from "./interObject";
import { LookupDefault } from "./lookup";

export default function LoadData(data: any): InterObjectData {
  switch (data.subname) {
    case "sketchText":
      return new SketchTextData().load(data);
    case "sketchImage":
      return new SketchImageData().load(data);
    case "sketchIcon":
      return new SketchIconData().load(data);
    case "sketchLink":
      return new SketchLinkData().load(data);
    case "sketchRegion":
      return new SketchRegionData().load(data);
    case "blockText":
      return new BlockTextData().load(data);
    case "blockRTF":
      return new BlockRTFData().load(data);
    case "processorText":
      return new ProcessorTextCountData().load(data);
    case "processorConcat":
      return new ProcessorConcatData().load(data);
    case "processorArray":
      return new ProcessorArrayData().load(data);
    case "processorJoin":
      return new ProcessorJoinData().load(data);
    case "processorSplit":
      return new ProcessorSplitData().load(data);
    default:
      return new InterObjectData().load(data);
  }
}
