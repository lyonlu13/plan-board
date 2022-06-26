import * as info from './info'
import { InterObjectInfo } from './interObject'

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
