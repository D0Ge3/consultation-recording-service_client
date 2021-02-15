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
      console.log('calling callback')
      callbackRef.current()
    }
  }, [value])

  let setValueCallback = useCallback((newValue, callback) => {
    console.log('setValueCallback', newValue)
    callbackRef.current = callback
    setValue(newValue)
  }, [])

  return [value, setValueCallback]
}
