import { GroupBase } from "react-select";
import { ImageSource } from "./data";

export enum PropFieldType {
  Text,
  Number,
  Number2D,
  Color,
  Select,
  Check,
  ToggleGroup,
  Info,
  Image,
}

export interface PropField {
  label: string;
  type: PropFieldType;
  caseTo: string;
}

export interface TextPropField extends PropField {
  type: PropFieldType.Text;
  placeholder: string;
  multiline?: boolean;
  readonly?: boolean;
}

export interface NumberPropField extends PropField {
  type: PropFieldType.Number;
  limit?: {
    max?: number;
    min?: number;
  };
  round: number;
  slider?: boolean;
  adjustBtn?: boolean;
  unit?: string;
}
export interface Number2DPropField extends PropField {
  type: PropFieldType.Number2D;
  midSymbol?: string;
  desc1?: string;
  desc2?: string;
}
export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

export interface SelectPropField extends PropField {
  type: PropFieldType.Select;
  isFont: boolean;
  items?: SelectOption[];
}
export interface ToggleGroupPropField extends PropField {
  type: PropFieldType.ToggleGroup;
  items: { icon: string; tip: string }[];
  unique?: boolean;
}

export interface InfoPropField extends PropField {
  type: PropFieldType.Info;
  multiline?: boolean;
}

export interface ImagePropField extends PropField {
  type: PropFieldType.Image;
}
