import {
  AppearanceContextInterface,
  AprcDefault,
  GeoDefault,
  GeometricContextInterface,
} from 'Contexts'
import React, { createContext, useState } from 'react'

export const GeoCtx = createContext<GeometricContextInterface>(GeoDefault)
export const AprcCtx = createContext<AppearanceContextInterface>(AprcDefault)

export default function StateProvider({ children }: Props) {
  //@ Appearance
  const [geoTransition, setGeoTransition] = useState<boolean>(false)

  //@ Geometric
  const [lastX, setLastX] = useState<number>(0)
  const [lastY, setLastY] = useState<number>(0)
  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)
  const [grab, setGrab] = useState<boolean>(false)
  const [select, setSelect] = useState<boolean>(false)
  const [lastOffsetX, setLastOffsetX] = useState<number>(0)
  const [lastOffsetY, setLastOffsetY] = useState<number>(0)
  const [offsetX, setOffsetX] = useState<number>(window.innerWidth / 2)
  const [offsetY, setOffsetY] = useState<number>(window.innerHeight / 2)
  const [zoom, setZoom] = useState<number>(1)

  return (
    <AprcCtx.Provider
      value={{
        geoTransition,
        setGeoTransition,
      }}
    >
      <GeoCtx.Provider
        value={{
          select,
          setSelect,
          grab,
          setGrab,
          offsetX,
          setOffsetX,
          offsetY,
          setOffsetY,
          zoom,
          setZoom,
          x,
          setX,
          y,
          setY,
          lastX,
          setLastX,
          lastY,
          setLastY,
          lastOffsetX,
          setLastOffsetX,
          lastOffsetY,
          setLastOffsetY,
        }}
      >
        {children}
      </GeoCtx.Provider>
    </AprcCtx.Provider>
  )
}

interface Props {
  children: React.ReactNode
}
