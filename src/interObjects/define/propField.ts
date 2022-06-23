export enum PropFieldType {
  Text,
  Number,
  Color,
  Select,
  Check,
  ToggleGroup,
  Info,
}

export interface PropField {
  label: string
  type: PropFieldType
  caseTo: String
}

export interface TextPropField extends PropField {
  type: PropFieldType.Text
  placeholder: string
  multiline?: boolean
}

export interface NumberPropField extends PropField {
  type: PropFieldType.Number
  limit?: {
    max?: number
    min?: number
  }
  round: number
  slider?: boolean
  adjustBtn?: boolean
  unit?: string
}

export interface SelectPropField<type = number> extends PropField {
  type: PropFieldType.Select
  isFont: boolean
  valueType: 'number' | 'string'
  items?: { text: string; value: type }[]
}

export interface ToggleGroupPropField extends PropField {
  type: PropFieldType.ToggleGroup
  items: { icon: string; tip: string }[]
  unique?: boolean
}

export interface InfoPropField extends PropField {
  type: PropFieldType.Info
  multiline?: boolean
}
