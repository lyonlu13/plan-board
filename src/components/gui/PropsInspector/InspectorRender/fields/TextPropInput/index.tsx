import styled from 'styled-components'
import { TextPropField } from 'interObjects/define/propField'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

const Input = styled.input`
  border-radius: 5px;
  outline: none;
  border: none;
  width: 100%;
  margin-right: 5px;
  padding: 5px;
`

export default function TextPropInput({ value, onChange, textField }: Props) {
  return textField.multiline ? (
    <ContentEditable
      className="plaintext"
      placeholder={textField.placeholder}
      style={{
        borderRadius: 5,
        outline: 'none',
        border: 'none',
        marginRight: 5,
        padding: 5,
        backgroundColor: 'white',
        color: 'black',
      }}
      html={value} // innerHTML of the editable div
      onChange={onChange}
    />
  ) : (
    <Input
      type="text"
      placeholder={textField.placeholder}
      value={value as string}
      onChange={onChange}
    />
  )
}

interface Props {
  value: string
  onChange: (event: ContentEditableEvent) => void
  textField: TextPropField
}
