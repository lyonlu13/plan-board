import { BlockTextInfo, SketchImageInfo, SketchTextInfo } from './info'
import { InterObjectInfo } from './interObject'

export const LookupInfo: { [id: string]: InterObjectInfo } = {
  SketchText: SketchTextInfo,
  SketchImage: SketchImageInfo,
  BlockText: BlockTextInfo,
}
