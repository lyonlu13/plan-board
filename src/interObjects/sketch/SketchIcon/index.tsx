import styled from 'styled-components'
import LocBase from 'interObjects/struct/LocBase'
import useData from 'hooks/useData'
import { SketchIconData, SketchImageData, SketchTextData } from '../../define/data'
import ContentEditable from 'react-contenteditable'
import { FC, useEffect, useRef, useState } from 'react'
import { InterObjectComponentProps } from 'interObjects/define/interObject'
import useObject from 'hooks/useObject'
import useGeo from 'hooks/useGeo'
import Frame from 'interObjects/struct/Frame'
import Icon from 'components/common/Icon'


const SketchIcon: FC<InterObjectComponentProps> = ({
  id,
  x,
  y,
  selected,
}: InterObjectComponentProps) => {
  const { data: rawData } = useData(id)
  const data = rawData as SketchIconData
  if(data)
  return (
    <LocBase id={id} x={x} y={y}>
      <Frame id={id}>
       <Icon icon={data.icon} color={data.color} size={data.size}/>
      </Frame>
    </LocBase>
  )
  return null
}

export default SketchIcon
