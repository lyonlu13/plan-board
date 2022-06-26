import { AprcCtx, GeoCtx } from 'components/logical/StateProvider'
import { Position } from 'interObjects/define/interObject'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import useViewPort from './useViewPort'

export default function useGeo() {
  const {
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
  } = useContext(GeoCtx)

  const { setGeoTransition } = useContext(AprcCtx)
  const transitionRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    function onMouseUpdate(e: MouseEvent) {
      setX(e.clientX)
      setY(e.clientY)
      if (grab) {
        setOffsetX(lastOffsetX + e.clientX - lastX)
        setOffsetY(lastOffsetY + e.clientY - lastY)
      } else {
        setLastOffsetX(offsetX)
        setLastOffsetY(offsetY)
      }
    }
    window.addEventListener('mousemove', onMouseUpdate)
    window.addEventListener('mouseenter', onMouseUpdate)
    return () => {
      window.removeEventListener('mousemove', onMouseUpdate)
      window.removeEventListener('mouseenter', onMouseUpdate)
    }
  }, [grab, lastX, lastY, lastOffsetX, lastOffsetY, offsetX, offsetY])

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (e.button === 0) setSelect(true)
      else if (e.button === 1) setGrab(true)
      setLastX(e.clientX)
      setLastY(e.clientY)
    }
    function onMouseUp(e: MouseEvent) {
      if (e.button === 0) setSelect(false)
      else if (e.button === 1) setGrab(false)
    }
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  function zoomTo(
    nZoom: number,
    center_x: number = window.innerWidth / 2,
    center_y: number = window.innerHeight / 2,
  ) {
    if (nZoom > 3.1 || nZoom < 0.5) return
    const scale = nZoom / zoom
    const fixedX = center_x - offsetX
    const fixedY = center_y - offsetY
    const deviationX = fixedX * scale - fixedX
    const deviationY = fixedY * scale - fixedY
    setOffsetX(offsetX - deviationX)
    setOffsetY(offsetY - deviationY)
    setLastOffsetX(lastOffsetX - deviationX)
    setLastOffsetY(lastOffsetY - deviationY)
    setZoom(nZoom)
  }

  useEffect(() => {
    const onMousewheel: EventListener = (event: any) => {
      event.stopImmediatePropagation()
      event.preventDefault()

      let nZoom = 0
      if (event.wheelDelta <= -120) nZoom = zoom - 0.1
      else if (event.wheelDelta >= 120) nZoom = zoom + 0.1
      zoomTo(nZoom, x, y)
      setGeoTransition(true)
      if (transitionRef.current) clearTimeout(transitionRef.current)
      transitionRef.current = setTimeout(() => setGeoTransition(false), 300)
    }
    window.addEventListener('mousewheel', onMousewheel, { passive: false })
    return () => {
      window.removeEventListener('mousewheel', onMousewheel, false)
    }
  }, [zoom, x, y])

  function setOffset(x?: number, y?: number) {
    x !== undefined && setOffsetX(x)
    y !== undefined && setOffsetY(y)
  }

  function realToPos(real: Position) {
    return {
      x: (real.x - offsetX) / zoom,
      y: (real.y - offsetY) / zoom,
    }
  }

  return {
    offsetX,
    offsetY,
    zoom,
    grab,
    setZoom,
    setOffset,
    zoomTo,
    select,
    x,
    y,
    lastX,
    lastY,
    realToPos,
  }
}
