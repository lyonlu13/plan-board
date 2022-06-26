import { InterObject, InterObjectData } from 'interObjects/define/interObject'

export interface GeometricContextInterface {
  select: boolean
  setSelect: (arg0: boolean) => void
  grab: boolean
  setGrab: (arg0: boolean) => void
  offsetX: number
  setOffsetX: (arg0: number) => void
  offsetY: number
  setOffsetY: (arg0: number) => void
  zoom: number
  setZoom: (arg0: number) => void
  x: number
  setX: (arg0: number) => void
  y: number
  setY: (arg0: number) => void
  lastX: number
  setLastX: (arg0: number) => void
  lastY: number
  setLastY: (arg0: number) => void
  lastOffsetX: number
  setLastOffsetX: (arg0: number) => void
  lastOffsetY: number
  setLastOffsetY: (arg0: number) => void
}

export const GeoDefault: GeometricContextInterface = {
  select: false,
  setSelect: (arg0: boolean) => {},
  grab: false,
  setGrab: (arg0: boolean) => {},
  offsetX: 0,
  setOffsetX: (arg0: number) => {},
  offsetY: 0,
  setOffsetY: (arg0: number) => {},
  zoom: 1,
  setZoom: (arg0: number) => {},
  x: 0,
  setX: (arg0: number) => {},
  y: 0,
  setY: (arg0: number) => {},
  lastX: 0,
  setLastX: (arg0: number) => {},
  lastY: 0,
  setLastY: (arg0: number) => {},
  lastOffsetX: 0,
  setLastOffsetX: (arg0: number) => {},
  lastOffsetY: 0,
  setLastOffsetY: (arg0: number) => {},
}

export interface AppearanceContextInterface {
  geoTransition: boolean
  setGeoTransition: (arg0: boolean) => void
}

export const AprcDefault: AppearanceContextInterface = {
  geoTransition: false,
  setGeoTransition: (arg0: boolean) => {},
}

export interface DataBulk {
  [id: string]: InterObjectData
}
export interface DataContextInterface {
  datas: DataBulk
  setDatas: (newVal: DataBulk) => void
}

export const DataDefault: DataContextInterface = {
  datas: {},
  setDatas: (newVal: DataBulk) => {},
}

export interface ObjectBulk {
  [id: string]: InterObject
}
export interface ObjectContextInterface {
  objects: ObjectBulk
  setObjects: (newVal: ObjectBulk) => void
  selectedList: string[]
  select: (target: string[], keep?: boolean) => void
  startDrag: (starter: string) => void
  stopDrag: () => void
}

export const ObjectDefault: ObjectContextInterface = {
  objects: {},
  setObjects: (newVal: ObjectBulk) => {},
  selectedList: [],
  select: (newVal: string[], keep?: boolean) => {},
  startDrag: (starter: string) => {},
  stopDrag: () => {},
}
export interface DataFlowContextInterface {
  buildLine: (a: string, b: number) => void
  lining: boolean
}

export const DataFlowDefault: DataFlowContextInterface = {
  buildLine: (a: string, b: number) => {},
  lining: false,
}
