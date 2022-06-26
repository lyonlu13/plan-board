import styled from 'styled-components'
import { useState } from 'react'
import { SketchPicker } from 'react-color'
import { GiEmptyChessboard } from 'react-icons/gi'

const Root = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const Color = styled.span`
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  box-shadow: 0 0 2px 0px black;
`

const Button = styled.span`
  font-size: 14px;
  height: 14px;
  color: white;
  transition: 0.2s;
  &:hover {
    color: lightgray;
  }
`
const Popover = styled.div`
  position: absolute;
  z-index: 2;
  top: 25px;
`
const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`

export default function ColorPropInput({ value, onChange }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Root>
      <Color style={{ backgroundColor: value }} onClick={() => setOpen(true)}>
        {open ? (
          <Popover>
            <Cover
              onMouseDown={(e) => {
                setOpen(false)
                e.stopPropagation()
              }}
            />
            <SketchPicker color={value} onChange={(e) => onChange(e.hex)} />
          </Popover>
        ) : null}
      </Color>
      <Button onClick={() => onChange('#FFFFFF00')}>
        <GiEmptyChessboard />
      </Button>
    </Root>
  )
}

interface Props {
  value: string
  onChange: (value: string) => void
}