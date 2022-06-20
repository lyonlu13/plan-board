import { useEffect, useState } from 'react'

export default function useViewPort() {
  const [vw, setVw] = useState<number>(0)
  const [vh, setVh] = useState<number>(0)

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
  }, [])

  function resize() {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0,
    )
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0,
    )
    setVw(vw)
    setVh(vh)
  }

  return { vw, vh }
}
