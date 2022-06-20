import useAppearance from 'hooks/useAppearance'
import useGeo from 'hooks/useGeo'
import useViewPort from 'hooks/useViewPort'
import styled from 'styled-components'

const Root = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  transform-origin: top left;
`

const Plate = styled.div`
  width: 200px;
  height: 200px;
  background-color: #414141;
  position: absolute;
  transform-origin: top left;
  border-radius: 5px;
  box-shadow: 0 0 10px 2px #2c2c2c;
  padding: 10px;
  color: white;
  cursor: move;
  transition: 0.2s;
  &:hover {
    box-shadow: 0 0 2px 1px #009faa;
  }
`

const TitleText = styled.div`
  font-size: 16px;
  padding: 0 5px;
  background-color: transparent;
  transition: 0.3s;
  color: white;
  &:hover {
    background-color: #ffffff67;
  }
`

const Scaler = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: white;
  right: 0;
  bottom: 0;
  transition: 0.2s;
  cursor: nwse-resize;
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
  &:hover {
    background-color: #009faa;
  }
`

interface Props {
  x: number
  y: number
}

export default function Block({ x, y }: Props) {
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
      <Plate>
        <TitleText>New Block</TitleText>
      </Plate>
      <Scaler id="scaler" />
    </Root>
  )
}
