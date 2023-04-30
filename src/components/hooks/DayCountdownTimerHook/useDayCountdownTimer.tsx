import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

const useDayCountdownTimer = (endDate: Date) => {
  const [remainingTime, setRemainingTime] = useState<number>(0)

  const intervalRef = useRef<NodeJS.Timer>()

  const calculateRemainingTime = useCallback(() => {
    const now = new Date().getTime()
    const difference = endDate.getTime() - now
    return difference > 0 ? difference : 0
  }, [endDate])

  const memoizedRemainingTime = useMemo(() => calculateRemainingTime(), [calculateRemainingTime])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemainingTime(memoizedRemainingTime)
    }, 1000)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [memoizedRemainingTime])

  return remainingTime
}

export default useDayCountdownTimer