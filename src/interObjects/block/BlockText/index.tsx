import styled from 'styled-components'
import LocBase from 'interObjects/struct/LocBase'
import useData from 'hooks/useData'
import { BlockTextData, SketchTextData } from '../../define/data'
import ContentEditable from 'react-contenteditable'
import { FC, useEffect, useRef, useState } from 'react'
import { InterObjectComponentProps } from 'interObjects/define/interObject'
import useObject from 'hooks/useObject'
import Block from 'interObjects/struct/Block'

const BlockText: FC<InterObjectComponentProps> = ({
  id,
  x,
  y,
  selected,
}: InterObjectComponentProps) => {
  const { select } = useObject(id)
  const { data: rawData, modify } = useData(id)
  const [editing, setEditing] = useState(false)
  const data = rawData as BlockTextData
  const ref = useRef<HTMLDivElement | null>(null)

  if (!data) return null

  return (
    <Block id={id} x={x} y={y}>
      <ContentEditable
        innerRef={ref}
        className="plaintext"
        style={{
          minWidth: 180,
          width: data.maxWidth || undefined,
          minHeight: 50,
          backgroundColor: data.ports.in[0] ? '#b1b1b1' : 'white',
          color: 'black',
          cursor: 'text',
          outline: 'none',
          onChange: '',
          display: 'inline-block',
          userSelect: selected || editing ? 'text' : 'none',
          padding: 5,
          borderRadius: 5,
        }}
        html={data.text}
        tagName="div"
        onChange={(e) => {
          if (!data.ports.in[0]) modify('text', e.target.value)
        }}
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
    </Block>
  )
}

export default BlockText
