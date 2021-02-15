import { useState, useRef, useEffect, useCallback } from 'react'

export const useStateCallback = (initialValues) => {
  const [value, setValue] = useState(initialValues)

  const callbackRef = useRef(null)
  const isFirstCallbackCall = useRef(true)

  useEffect(() => {
    if (isFirstCallbackCall.current) {
      isFirstCallbackCall.current = false
      return
    }
    if (typeof callbackRef.current === 'function') {
      callbackRef.current()
    }
  }, [value])

  let setValueCallback = useCallback((newValue, callback) => {
    callbackRef.current = callback
    setValue(newValue)
  }, [])

  return [value, setValueCallback]
}
