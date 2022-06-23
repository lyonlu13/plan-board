import { AprcCtx, GeoCtx } from 'components/logical/StateProvider'
import useViewPort from 'hooks/useViewPort'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { HiMenu } from 'react-icons/hi'
import { MdControlCamera, MdZoomIn, MdZoomOut } from 'react-icons/md'
import AutosizeInput from 'react-input-autosize'
import ReactTooltip from 'react-tooltip'
import useGeo from 'hooks/useGeo'
import useAppearance from 'hooks/useAppearance'
import Icon from 'components/common/Icon'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 220px;
  z-index: 2;
  right: 15px;
  top: 15px;
  gap: 15px;
`

export default function RightPanel({ children }: Props) {
  return <Root>{children}</Root>
}

interface Props {
  children: ReactNode
}
