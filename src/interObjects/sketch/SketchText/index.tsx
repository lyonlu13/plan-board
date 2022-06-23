import styled from 'styled-components'
import LocBase from 'interObjects/LocBase'
import useData from 'hooks/useData'
import { TextSketchData } from './Text'
import ContentEditable from 'react-contenteditable'
import { useEffect, useRef, useState } from 'react'

const Frame = styled.div`
  padding: 5px;
  cursor: move;
  transition: 0.2s;
  &:hover {
    box-shadow: 0 0 2px 1px #009faa;
  }
  text-align: left;
`

interface Props {
  id: string
  x: number
  y: number
}

export default function SketchText({ id, x, y }: Props) {
  const { data: rawData, modify } = useData(id)
  const data = rawData as TextSketchData
  const [text, setText] = useState('')
  const mount = useRef(false)

  useEffect(() => {
    if (text !== data.text) setText(data.text)
  }, [data])

  useEffect(() => {
    if (mount.current && text !== data.text) {
      const debounce = setTimeout(() => modify('text', text), 500)
      return () => {
        clearTimeout(debounce)
      }
    } else mount.current = true
  }, [text, modify])

  return (
    <LocBase x={x} y={y}>
      <Frame>
        <ContentEditable
          style={{
            fontSize: data.fontSize,
            color: data.color.foreground,
            backgroundColor: data.color.background,
            cursor: 'text',
            outline: 'none',
            onChange: '',
            minWidth: '50px',
            display: 'inline-block',
          }}
          html={text} // innerHTML of the editable div
          tagName="a" // Use a custom HTML tag (uses a div by default)
          onChange={(e) => setText(e.target.value)}
        />
      </Frame>
    </LocBase>
  )
}
