import {
  BlockRTFDataDefault,
  BlockTextDataDefault,
  ProcessorArrayData,
  ProcessorConcatData,
  ProcessorJoinData,
  ProcessorSplitData,
  ProcessorTextCountData,
  SketchIconDataDefault,
  SketchImageDataDefault,
  SketchLinearLayoutDataDefault,
  SketchLinkDataDefault,
  SketchRegionDataDefault,
  SketchTextDataDefault,
} from "./data";
import * as info from "./info";
import { InterObjectData, InterObjectInfo } from "./interObject";

export const LookupSketch: { [id: string]: InterObjectInfo } = {
  SketchText: info.SketchTextInfo,
  SketchImage: info.SketchImageInfo,
  SketchIcon: info.SketchIconInfo,
  SketchLink: info.SketchLinkInfo,
  SketchRegion: info.SketchRegionInfo,
  SketchLinearLayout: info.SketchLinearLayoutInfo,
};

export const LookupBlock: { [id: string]: InterObjectInfo } = {
  BlockText: info.BlockTextInfo,
  BlockRTF: info.BlockRTFInfo,
};

export const LookupProcessor: { [id: string]: InterObjectInfo } = {
  ProcessorTextCount: info.ProcessorTextCountInfo,
  ProcessorConcat: info.ProcessorConcatInfo,
  ProcessorArray: info.ProcessorArrayInfo,
  ProcessorJoin: info.ProcessorJoinInfo,
  ProcessorSplit: info.ProcessorSplitInfo,
};

export const LookupInterObjs: { [id: string]: InterObjectInfo } = {
  ...LookupSketch,
  ...LookupBlock,
  ...LookupProcessor,
};

export const LookupDefault: { [id: string]: InterObjectData } = {
  SketchText: SketchTextDataDefault(),
  SketchImage: SketchImageDataDefault(),
  SketchIcon: SketchIconDataDefault(),
  SketchLink: SketchLinkDataDefault(),
  SketchRegion: SketchRegionDataDefault(),
  SketchLinearLayout: SketchLinearLayoutDataDefault(),
  BlockText: BlockTextDataDefault(),
  BlockRTF: BlockRTFDataDefault(),
  ProcessorTextCount: new ProcessorTextCountData(),
  ProcessorConcat: new ProcessorConcatData(),
  ProcessorArray: new ProcessorArrayData(),
  ProcessorJoin: new ProcessorJoinData(),
  ProcessorSplit: new ProcessorSplitData(),
};
