import { useEffect, useRef } from 'react'

function useInterval(
  callback,
  delay,
  runOnLoad = false,
  effectDependencies = []
) {
  const savedCallback = useRef()

  useEffect(() => {
    if (runOnLoad) {
      callback()
    }
  }, [...effectDependencies]) // eslint-disable-line

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay)
      return () => clearInterval(id)
    }
  }, [delay, ...effectDependencies]) // eslint-disable-line
}

export default useInterval
