import { Board } from "define/board";
import { InterObject, InterObjectData } from "interObjects/define/interObject";

export interface GeometricContextInterface {
  select: boolean;
  setSelect: (arg0: boolean) => void;
  grab: boolean;
  setGrab: (arg0: boolean) => void;
  offsetX: number;
  setOffsetX: (arg0: number) => void;
  offsetY: number;
  setOffsetY: (arg0: number) => void;
  zoom: number;
  setZoom: (arg0: number) => void;
  x: number;
  setX: (arg0: number) => void;
  y: number;
  setY: (arg0: number) => void;
  lastX: number;
  setLastX: (arg0: number) => void;
  lastY: number;
  setLastY: (arg0: number) => void;
  lastOffsetX: number;
  setLastOffsetX: (arg0: number) => void;
  lastOffsetY: number;
  setLastOffsetY: (arg0: number) => void;
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
};

export interface AppearanceContextInterface {
  geoTransition: boolean;
  setGeoTransition: (arg0: boolean) => void;
}

export const AprcDefault: AppearanceContextInterface = {
  geoTransition: false,
  setGeoTransition: (arg0: boolean) => {},
};

export interface DataBulk {
  [id: string]: InterObjectData;
}
export interface DataContextInterface {
  datas: DataBulk;
  setDatas: (newVal: DataBulk) => void;
}

export const DataDefault: DataContextInterface = {
  datas: {},
  setDatas: (newVal: DataBulk) => {},
};

export interface ObjectBulk {
  [id: string]: InterObject;
}
export interface BoardContextInterface {
  boardList: string[];
  boards: { [_: string]: Board };
  current: string;
  setCurrent: (_: string) => void;
  setTitle: (_: string) => void;
  syncObjectList: (_: string[]) => void;
  newBoard: (_?: string) => void;
}

export const BoardDefault: BoardContextInterface = {
  boardList: [],
  boards: {},
  current: "",
  setCurrent: (_: string) => {},
  setTitle: (_: string) => {},
  syncObjectList: (_: string[]) => {},
  newBoard: (_?: string) => {},
};

export interface ObjectContextInterface {
  objects: ObjectBulk;
  setObjects: (newVal: ObjectBulk) => void;
  objectList: string[];
  setObjectList: (newVal: string[]) => void;
  selectedList: string[];
  select: (target: string[], keep?: boolean) => void;
  unselect: (target: string[]) => void;
  startDrag: (starter: string) => void;
  stopDrag: () => void;
}

export const ObjectDefault: ObjectContextInterface = {
  objects: {},
  setObjects: (newVal: ObjectBulk) => {},
  objectList: [],
  setObjectList: (newVal: string[]) => {},
  selectedList: [],
  select: (newVal: string[], keep?: boolean) => {},
  unselect: (val: string[]) => {},
  startDrag: (starter: string) => {},
  stopDrag: () => {},
};
export interface DataFlowContextInterface {
  buildLine: (a: string, b: number) => void;
  lining: boolean;
}

export const DataFlowDefault: DataFlowContextInterface = {
  buildLine: (a: string, b: number) => {},
  lining: false,
};

export interface MediaContextInterface {
  newImage: (name: string, blob: Blob) => Promise<string>;
  allImage: () => Promise<string[]>;
  img: (id: string) => Promise<string>;
}

export const MediaDefault: MediaContextInterface = {
  newImage: (name: string, blob: Blob) => new Promise<string>(() => {}),
  allImage: () => new Promise<string[]>(() => {}),
  img: (id: string) => new Promise<string>(() => {}),
};

export interface ActionContextInterface {
  showNewInterObjectModel: () => void;
}

export const ActionDefault: ActionContextInterface = {
  showNewInterObjectModel: () => {},
};
