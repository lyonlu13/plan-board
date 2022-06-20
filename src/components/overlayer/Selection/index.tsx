import { GeoCtx } from 'components/logical/DataProvider'
import useGeo from 'hooks/useGeo'
import { useContext } from 'react'
import styled from 'styled-components'

const Root = styled.div`
  position: fixed;
  border: #ffffff85 2px solid;
  background-color: #d3d3d31d;
  z-index: 2;
`

export default function Selection() {
  const { x, y, lastX, lastY, select } = useGeo()
  const width = Math.abs(x - lastX)
  const height = Math.abs(y - lastY)
  return select ? (
    <Root
      style={{
        left: lastX < x ? lastX : x,
        top: lastY < y ? lastY : y,
        width,
        height,
      }}
    />
  ) : null
}
