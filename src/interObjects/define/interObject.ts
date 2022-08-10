import { FC } from "react";
import makeId from "utils/makeId";
import { LookupInterObjs } from "./lookup";
import { PropField } from "./propField";

export enum ObjectType {
  Sketch,
  Block,
  Processor,
  Register,
}

export interface Position {
  x: number;
  y: number;
}

export class InterObject {
  id: string;
  pos: Position;
  type: ObjectType;
  subname: string;
  locked: boolean;
  visibility: boolean;
  constructor(type?: ObjectType, subname?: string, id?: string) {
    this.id = id || "";
    this.type = type || ObjectType.Sketch;
    this.pos = { x: 0, y: 0 };
    this.subname = subname || "none";
    this.locked = false;
    this.visibility = true;
  }
  move(newPos: Position) {
    this.pos = newPos;
    return this;
  }
  load({ id, pos, type, subname, locked, visibility }: InterObject) {
    this.id = id;
    this.pos = pos;
    this.type = type;
    this.subname = subname;
    this.locked = locked;
    this.visibility = visibility;
    return this;
  }
}

export class InterObjectInfo {
  type: ObjectType;
  displayName: string = "";
  name: string;
  description: string = "";
  propFields: PropField[];
  component!: FC<InterObjectComponentProps>;
  icon: string = "";
  constructor(type: ObjectType, name: string) {
    this.type = type;
    this.name = name;
    this.propFields = [];
  }
  prop(pf: PropField) {
    this.propFields.push(pf);
    return this;
  }
  bind(fc: FC<InterObjectComponentProps>) {
    this.component = fc;
    return this;
  }
  setIcon(icon: string) {
    this.icon = icon;
    return this;
  }
  setDisplayName(displayName: string) {
    this.displayName = displayName;
    return this;
  }
  setDescription(description: string) {
    this.description = description;
    return this;
  }
}

export class InterObjectData {
  id: string = makeId();
  subname: string = "";
  name: string;
  ports: {
    in: boolean[];
    out: boolean[];
  } = { in: [], out: [] };
  constructor() {
    this.name = "nameless";
  }
  loadFromJSON(json: string) {
    const obj: any = JSON.parse(json);
    Object.keys(obj).forEach((key) => {
      if (key in this) {
        (this as any)[key] = obj[key];
      }
    });
    return this;
  }

  load(obj: any) {
    Object.keys(obj).forEach((key) => {
      if (key in obj) {
        (this as any)[key] = obj[key];
      }
    });
    return this;
  }
  mutate(path: string, value: any) {
    const nodeNames = path.split(".");
    let cur = this as any;
    let depth = 0;
    while (depth < nodeNames.length - 1) {
      const key = nodeNames[depth];
      if (key in cur) {
        cur = cur[key];
        depth++;
      } else {
        return this;
      }
    }
    cur[nodeNames[nodeNames.length - 1]] = value;
    return this;
  }
  getProp(path: string) {
    const nodeNames = path.split(".");
    let cur = this as any;
    let depth = 0;
    while (depth < nodeNames.length - 1) {
      const key = nodeNames[depth];
      if (key in cur) {
        cur = cur[key];
        depth++;
      } else {
        return null;
      }
    }
    return cur[nodeNames[nodeNames.length - 1]];
  }
  input(args: any[]) {}
  output(): any[] {
    return [];
  }
  passive() {
    return false;
  }
  nameRender(): string | null {
    return null;
  }
  dynamicPorts(): {
    inputs: { title: string }[];
    outputs: { title: string }[];
  } {
    return { inputs: [], outputs: [] };
  }
}

export interface InterObjectComponentProps {
  id: string;
  x: number;
  y: number;
  selected: boolean;
}

export interface ProcessorComponentProps {
  id: string;
  x: number;
  y: number;
  selected: boolean;
  info: ProcessorInfo;
}

export class ProcessorInfo extends InterObjectInfo {
  inputs: { title: string }[] = [];
  outputs: { title: string }[] = [];
  dynamicPort: boolean = false;
  prop(pf: PropField) {
    this.propFields.push(pf);
    return this;
  }
  input(port: number, title: string) {
    this.inputs[port] = { title };
    return this;
  }
  output(port: number, title: string) {
    this.outputs[port] = { title };
    return this;
  }
  dp() {
    this.dynamicPort = true;
    return this;
  }
}
