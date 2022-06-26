import { FC } from 'react'
import { PropField } from './propField'

export enum ObjectType {
  Sketch,
  Block,
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
  subname: string
  constructor(type: ObjectType, subname: string, id: string) {
    this.id = id
    this.type = type
    this.pos = { x: 0, y: 0 }
    this.subname = subname
  }
  move(newPos: Position) {
    this.pos = newPos
    return this
  }
}

export class InterObjectInfo {
  type: ObjectType
  name: string
  description: string
  propFields: PropField[]
  component!: FC<InterObjectComponentProps>
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
  bind(fc: FC<InterObjectComponentProps>) {
    this.component = fc
    return this
  }
}

export class InterObjectData {
  name: string
  ports: {
    in: boolean[]
    out: boolean[]
  } = { in: [], out: [] }
  constructor(name?: string) {
    this.name = name || 'nameless'
  }
  loadFromJSON(json: string) {
    const obj: any = JSON.parse(json)
    Object.keys(obj).forEach((key) => {
      if (key in this) {
        ;(this as any)[key] = obj[key]
      }
    })
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
  getProp(path: string) {
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
    return cur[nodeNames[nodeNames.length - 1]]
  }
  input(args: any[]) {}
  output(): any[] {
    return []
  }
}

export interface InterObjectComponentProps {
  id: string
  x: number
  y: number
  selected: boolean
}
