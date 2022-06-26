import styled from 'styled-components'
import {
  SelectOption,
  SelectPropField,
  TextPropField,
} from 'interObjects/define/propField'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const Input = styled.input`
  border-radius: 5px;
  outline: none;
  border: none;
  width: 100%;
  margin-right: 5px;
  padding: 5px;
`
const fontOptions = [
  { label: 'Arial', value: 'Arial' },
  { label: 'Verdana', value: 'Verdana' },
  { label: 'Tahoma', value: 'Tahoma' },
  { label: 'Times New Roman', value: 'Times New Roman' },
  { label: '微軟正黑體', value: 'Microsoft JhengHei' },
  { label: '標楷體', value: 'DFKai-SB' },
  { label: '新細明體', value: 'PMingLiU' },
  { label: '細明體', value: 'MingLiU' },
  { label: 'Senobi Gothic Regular', value: 'Senobi Gothic Regular' },
]

export default function SelectPropInput({
  value,
  onChange,
  selectField,
}: Props) {
  return (
    <Dropdown
      value={value}
      onChange={(e) => {
        onChange(e.value)
      }}
      options={selectField.isFont ? fontOptions : selectField.items!}
      controlClassName="myControlClassName"
      arrowClassName="myArrowClassName"
    />
  )
}

interface Props {
  value: string
  onChange: (val: string) => void
  selectField: SelectPropField
}
