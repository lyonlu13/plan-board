import styled from 'styled-components'
import LocBase from 'interObjects/struct/LocBase'
import useData from 'hooks/useData'
import { SketchTextData } from '../../define/data'
import ContentEditable from 'react-contenteditable'
import { FC, useEffect, useRef, useState } from 'react'
import { InterObjectComponentProps } from 'interObjects/define/interObject'
import useObject from 'hooks/useObject'
import Frame from 'interObjects/struct/Frame'

const SketchText: FC<InterObjectComponentProps> = ({
  id,
  x,
  y,
  selected,
}: InterObjectComponentProps) => {
  const { select } = useObject(id)
  const { data: rawData, modify } = useData(id)
  const [editing, setEditing] = useState(false)
  const data = rawData as SketchTextData
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (editing) {
      let range = document.createRange()
      let sel = window.getSelection()
      if (ref.current) {
        range.selectNodeContents(ref.current)
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
    }
  }, [editing])

  if (!data) return null

  const decoration = [
    data.line.over && 'overline',
    data.line.through && 'line-through',
    data.line.under && 'underline',
  ]
    .filter((d) => !!d)
    .join(' ')

  let align = ''
  if (data.align.left) align = 'left'
  else if (data.align.center) align = 'center'
  else if (data.align.justify) align = 'justify'
  else if (data.align.right) align = 'right'

  return (
    <LocBase id={id} x={x} y={y}>
      <Frame
        padding={5}
        id={id}
        onDoubleClick={(e) => {
          if (!data.permanent || editing) return
          setEditing(true)
        }}
      >
        <ContentEditable
          innerRef={ref}
          className="plaintext"
          style={{
            whiteSpace: data.maxWidth ? 'normal' : 'nowrap',
            fontSize: data.size + 'px',
            fontFamily: data.font,
            color: data.color.foreground,
            backgroundColor: data.color.background,
            cursor: 'text',
            outline: 'none',
            minWidth: '50px',
            width: data.maxWidth ? data.maxWidth : 'auto',
            display: 'inline-block',
            userSelect: selected || editing ? 'text' : 'none',
            fontWeight: data.style.bold && 'bold',
            fontStyle: data.style.italic && 'italic',
            textDecoration: decoration,
            pointerEvents: !editing && data.permanent ? 'none' : 'auto',
            textAlign: align,
          }}
          disabled={!selected}
          html={data.text}
          tagName="div"
          onChange={(e) => modify('text', e.target.value)}
          onFocus={() => {
            select()
          }}
          onMouseDown={(e) => {
            select()
            e.stopPropagation()
          }}
          onBlur={(e) => {
            setEditing(false)
          }}
          onKeyDown={(e) => {
            e.stopPropagation()
          }}
        />
      </Frame>
    </LocBase>
  )
}

export default SketchText
