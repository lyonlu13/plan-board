import useGeo from 'hooks/useGeo'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Indicator = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  align-items: center;
  position: fixed;
  background-color: #464646;
  color: white;
  width: 120px;
  height: 60px;
  z-index: 2;
  left: 15px;
  bottom: 15px;
  border-radius: 10px;
  transition: 0.3s;
  user-select: none;
`

export default function ZoomIndicator() {
  const { zoom } = useGeo()

  const [show, setShow] = useState<boolean>(false)
  useEffect(() => {
    setShow(true)
    const timeout = setTimeout(() => setShow(false), 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [zoom])
  return (
    <Indicator
      style={{
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      {Math.round((zoom || 1) * 100)}%
    </Indicator>
  )
}
