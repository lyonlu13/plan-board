import { PropField } from './propField'

export enum ObjectType {
  Sketch,
  DataBlock,
  Processor,
  Register,
}

export interface Position {
  x: number
  y: number
}

export class InterObject {
  id: string
  pos: Position
  type: ObjectType
  constructor(type: ObjectType, id: string) {
    this.id = id
    this.type = type
    this.pos = { x: 0, y: 0 }
  }
}

export class InterObjectInfo {
  type: ObjectType
  name: string
  description: string
  propFields: PropField[]
  constructor(type: ObjectType, name: string, description: string) {
    this.type = type
    this.name = name
    this.description = description
    this.propFields = []
  }

  prop(pf: PropField) {
    this.propFields.push(pf)
    return this
  }
}

export class InterObjectData {
  name: string
  constructor(name?: string) {
    this.name = name || 'nameless'
  }
  loadFromJSON(json: string) {
    const obj: any = JSON.parse(json)
    this.name =
      'name' in obj && typeof obj.name === 'string' ? obj.name : 'noname'

    return this
  }
  mutate(path: string, value: any) {
    const nodeNames = path.split('.')
    let cur = this as any
    let depth = 0
    while (depth < nodeNames.length - 1) {
      const key = nodeNames[depth]
      if (key in cur) {
        cur = cur[key]
        depth++
      } else {
        return null
      }
    }
    cur[nodeNames[nodeNames.length - 1]] = value
  }
}
