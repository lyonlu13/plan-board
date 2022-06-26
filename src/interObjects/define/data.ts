import { InterObjectData } from 'interObjects/define/interObject'

export class SketchTextData extends InterObjectData {
  text!: string
  maxWidth!: number
  size!: number
  color!: {
    foreground: string
    background: string
  }
  font!: string
  style!: {
    bold: boolean
    italic: boolean
  }
  line!: {
    over: false
    through: false
    under: false
  }
  permanent!: boolean
  align!: {
    left: boolean
    center: boolean
    justify: boolean
    right: boolean
  }
  // loadFromJSON(json: string) {
  //   const obj: any = JSON.parse(json)
  //   this.name =
  //     'name' in obj && typeof obj.name === 'string' ? obj.name : 'noname'
  //   this.text = 'text' in obj && typeof obj.text === 'string' ? obj.text : ''
  //   this.size = 'size' in obj && typeof obj.size === 'number' ? obj.size : 12
  //   this.color =
  //     'color' in obj && 'foreground' in obj.color && 'background' in obj.color
  //       ? obj.color
  //       : { foreground: 'black', background: 'transition' }
  //   this.font =
  //     'font' in obj && typeof obj.font === 'string' ? obj.font : 'Arial'
  //   this.style =
  //     'style' in obj && 'bold' in obj.style && 'italic' in obj.style
  //       ? obj.style
  //       : {
  //           bold: false,
  //           italic: false,
  //         }
  //   this.line =
  //     'line' in obj &&
  //     'over' in obj.line &&
  //     'through' in obj.line &&
  //     'under' in obj.line
  //       ? obj.line
  //       : {
  //           over: false,
  //           through: false,
  //           under: false,
  //         }

  //   this.permanent =
  //     'permanent' in obj && typeof obj.permanent === 'boolean'
  //       ? obj.permanent
  //       : false
  //   return this
  // }
}

export function SketchTextDataDefault(): SketchTextData {
  return new SketchTextData('New Text').loadFromJSON(`{
  "name": "New Text",
  "maxWidth":0,
  "text": "New Text Here...",
  "size": 14,
  "color": {"background":"#00000000","foreground":"#FFFFFF"},
  "font":"Arial",
  "style":{
    "bold": false,
    "italic": false
  },
  "align":{
    "left":true,
    "center":false,
    "justify":false,
    "right":false
  },
  "line":{
    "over": false,
    "through": false,
    "under": false
  },
  "permanent": true
}
`)
}

export interface ImageSource {
  type: 'none' | 'url' | 'store'
  sourceStr: string
}

export class SketchImageData extends InterObjectData {
  source!: ImageSource
  dim!: {
    resizeMode: {
      none: boolean
      both: boolean
      h: boolean
      v: boolean
    }
    width: number
    height: number
  }
  flip!: {
    h: boolean
    v: boolean
  }
}
export function SketchImageDataDefault(): SketchImageData {
  return new SketchImageData('New Image').loadFromJSON(`{
  "name": "New Image",
  "source":{
    "type": "url",
    "sourceStr":"https://agirls.aottercdn.com/media/c425be65-cf16-4fc2-9e61-c552ff2ce0e8.jpg"
  },
  "dim": {
    "resizeMode": {
      "none" : false,
      "both" : true,
      "h" : false,
      "v" : false
    },
    "width": 400,
    "height": 200
  },
  "flip":{
    "h" : false,
    "v" : false
  }
}
`)
}

export class BlockTextData extends InterObjectData {
  maxWidth!: number
  text!: string
  input(args: any[]) {
    this.text = args[0]
  }
  output(): any[] {
    return [this.text]
  }
  passive() {
    return this.ports.in[0]
  }
}
export function BlockTextDataDefault(): BlockTextData {
  return new BlockTextData('New Text').loadFromJSON(`{
  "maxWidth": 180,
  "text":"input something..."
}
`)
}
