import { GeoCtx } from 'components/logical/StateProvider'
import useGeo from 'hooks/useGeo'
import { Position } from 'interObjects/define/interObject'
import { MouseEventHandler, useContext } from 'react'
import styled from 'styled-components'

interface Props {
  onClick: MouseEventHandler
  pos1: Position
  pos2: Position
}
const Path = styled.path`
  stroke: rgb(0, 151, 156);
  stroke-width: 5px;
  &:hover {
    stroke: rgb(255, 208, 0);
  }
`
export default function DataLine({ onClick, pos1, pos2 }: Props) {
  return (
    <Path
      onClick={onClick}
      d={`M ${pos1.x} ${pos1.y}
        L ${pos2.x} ${pos2.y}  `}
    ></Path>
  )
}

// export default function DataLine({ pos1, pos2 }: Props) {
//   const deltaX = pos2.x - pos1.x
//   const deltaY = pos2.y - pos1.y
//   const fx = deltaX / 2
//   const fy = deltaY / 2
//   return (
//     <SVG
//       style={{
//         left: pos1.x,
//         top: pos1.y,
//       }}
//       width={deltaX}
//       height={deltaY}
//     >
//       <path
//         d={`M 0 0 L ${fx / 2} 0
//         C ${fx / 2} 0 ${(fx / 4) * 3} 0 ${fx} ${fy}
//         C ${fx + fx / 6} ${deltaY} ${1.5 * fx} ${deltaY} ${
//           deltaX - fx / 2
//         } ${deltaY}
//         L ${deltaX} ${deltaY}`}
//       ></path>
//     </SVG>
//   )
// }
