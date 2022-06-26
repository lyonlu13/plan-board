import {
  BlockTextDataDefault,
  ProcessorArrayData,
  ProcessorConcatData,
  ProcessorJoinData,
  ProcessorSplitData,
  ProcessorTextCountData,
  SketchImageDataDefault,
  SketchTextDataDefault,
} from './data'
import * as info from './info'
import { InterObjectData, InterObjectInfo } from './interObject'

export const LookupInfo: { [id: string]: InterObjectInfo } = {
  SketchText: info.SketchTextInfo,
  SketchImage: info.SketchImageInfo,
  BlockText: info.BlockTextInfo,
  ProcessorTextCount: info.ProcessorTextCountInfo,
  ProcessorConcat: info.ProcessorConcatInfo,
  ProcessorArray: info.ProcessorArrayInfo,
  ProcessorJoin: info.ProcessorJoinInfo,
  ProcessorSplit: info.ProcessorSplitInfo,
}

export const LookupSketch: { [id: string]: InterObjectInfo } = {
  SketchText: info.SketchTextInfo,
  SketchImage: info.SketchImageInfo,
}

export const LookupBlock: { [id: string]: InterObjectInfo } = {
  BlockText: info.BlockTextInfo,
}

export const LookupProcessor: { [id: string]: InterObjectInfo } = {
  ProcessorTextCount: info.ProcessorTextCountInfo,
  ProcessorConcat: info.ProcessorConcatInfo,
  ProcessorArray: info.ProcessorArrayInfo,
  ProcessorJoin: info.ProcessorJoinInfo,
  ProcessorSplit: info.ProcessorSplitInfo,
}

export const LookupInterObjs: { [id: string]: InterObjectInfo } = {
  ...LookupSketch,
  ...LookupBlock,
  ...LookupProcessor,
}

export const LookupDefault: { [id: string]: InterObjectData } = {
  SketchText: SketchTextDataDefault(),
  SketchImage: SketchImageDataDefault(),
  BlockText: BlockTextDataDefault(),
  ProcessorTextCount: new ProcessorTextCountData(),
  ProcessorConcat: new ProcessorConcatData(),
  ProcessorArray: new ProcessorArrayData(),
  ProcessorJoin: new ProcessorJoinData(),
  ProcessorSplit: new ProcessorSplitData(),
}
