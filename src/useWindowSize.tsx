import { useEffect, useState } from 'react'

export function useWindowSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  const handleSize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }

  useEffect(() => {
    // add resize event listener
    window.addEventListener('resize', handleSize)

    // remove resize event listener
    return () => {
      window.removeEventListener('resize', handleSize)
    }
  }, [])

  return [size]
}
