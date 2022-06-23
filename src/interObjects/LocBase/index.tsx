import useAppearance from 'hooks/useAppearance'
import useGeo from 'hooks/useGeo'
import { ReactNode } from 'react'
import styled from 'styled-components'

const Root = styled.div`
  position: absolute;
  transform-origin: top left;
`

interface Props {
  x: number
  y: number
  children: ReactNode
}

export default function LocBase({ x, y, children }: Props) {
  const { zoom, offsetX, offsetY } = useGeo()
  const { geoTransition } = useAppearance()

  return (
    <Root
      onMouseDown={(e) => {
        e.stopPropagation()
      }}
      style={{
        left: offsetX + x * zoom,
        top: offsetY + y * zoom,
        transform: `scale(${zoom})`,
        transition: `${geoTransition ? '0.3s' : '20ms'} all, 0.2s box-shadow`,
      }}
    >
      {children}
    </Root>
  )
}
