import { DFCtx } from 'components/logical/DataFlowProvider'
import useAppearance from 'hooks/useAppearance'
import useData from 'hooks/useData'
import useGeo from 'hooks/useGeo'
import useObject from 'hooks/useObject'
import useViewPort from 'hooks/useViewPort'
import { ProcessorComponentProps } from 'interObjects/define/interObject'
import { ReactNode, useContext, useRef } from 'react'
import { MdArrowLeft, MdArrowRight, MdInput } from 'react-icons/md'
import styled from 'styled-components'
import Frame from '../Frame'

const Root = styled.div`
  min-width: 200px;
  position: absolute;
  transform-origin: top left;
  z-index: 1;
`

const Plate = styled.div`
  background-color: #414141;
  transform-origin: top left;
  border-radius: 5px;
  box-shadow: 0 0 10px 2px #2c2c2c;
  padding: 5px 10px 10px 10px;
  color: white;
  cursor: move;
  transition: 0.2s;
  display: flex;
  gap: 10px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Node = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
`

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
  padding: 0 5px;
  margin-bottom: 5px;
  color: white;
  text-align: center;
  font-weight: bold;
`

interface Props {
  id: string
  x: number
  y: number
  children: ReactNode
}

export default function Processor({ id, x, y, info }: ProcessorComponentProps) {
  const { zoom, offsetX, offsetY } = useGeo()
  const { geoTransition } = useAppearance()
  const { select, startDrag, selectedList, stopDrag, selected } = useObject(id)
  const { data } = useData(id)
  const clickDetect = useRef(0)
  const { buildLine, lining } = useContext(DFCtx)
  return (
    <Root
      id={`inter-obj-${id}`}
      onMouseDown={(e) => {
        if (selected || !selectedList.length) {
          startDrag(id)
          select(true)
        } else if (selectedList.length) {
          startDrag(id)
          select()
        }
        e.stopPropagation()
        e.preventDefault()
        clickDetect.current = new Date().getTime()
      }}
      onMouseUp={(e) => {
        if (new Date().getTime() - clickDetect.current < 200) {
          select()
        }
        stopDrag()
      }}
      style={{
        left: offsetX + x * zoom,
        top: offsetY + y * zoom,
        transform: `scale(${zoom})`,
        transition: `${geoTransition ? '0.3s' : '20ms'} all, 0.2s box-shadow`,
      }}
    >
      <Frame id={id} radius>
        <Plate>
          <Column>
            {info.inputs.map((input, i) => (
              <Node>
                <MdArrowRight
                  className={
                    lining && !data.ports.in[i] ? 'selectable' : 'unselectable'
                  }
                  size={24}
                  id={`in${i}`}
                  onClick={() => {
                    buildLine(id, i)
                  }}
                />
                {input.title}
              </Node>
            ))}
          </Column>
          <Title>{info.name}</Title>
          <Column>
            {info.outputs.map((output, i) => (
              <Node>
                {output.title}
                <MdArrowRight
                  className={!lining ? 'selectable' : 'unselectable'}
                  size={24}
                  id={`out${i}`}
                  onClick={() => {
                    buildLine(id, i)
                  }}
                />
              </Node>
            ))}
          </Column>
        </Plate>
      </Frame>
    </Root>
  )
}
