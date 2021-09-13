import { useCallback, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import jwtDecode from "jwt-decode"
import { isAuthorizedSelector } from "store/redux/auth/selectors"
import { userInactiveAction, renewTokenAction } from "store/redux/auth/actions"

const DEFAULT_ELEMENT = document

const DEFAULT_EVENTS = [
  "mousemove",
  "keydown",
  "wheel",
  "DOMMouseScroll",
  "mousewheel",
  "mousedown",
  "touchstart",
  "touchmove",
  "MSPointerDown",
  "MSPointerMove",
  "visibilitychange",
]

const useIdleMonitor = ({
  events = DEFAULT_EVENTS,
  element = DEFAULT_ELEMENT,
  capture = true,
  passive = true,
  timeout = 1,
  delay = 1000,
}) => {
  const timer = useRef()
  const inActiveTime = useRef()

  const dispatch = useDispatch()

  const isAuthorized = useSelector(isAuthorizedSelector)

  const handleEvent = useCallback(() => {
    inActiveTime.current = 0
  }, [])

  const _unbindEvents = () => {
    events.forEach((e) => {
      element.removeEventListener(e, handleEvent, {
        capture,
        passive,
      })
    })
  }

  const _bindEvents = () => {
    events.forEach((e) => {
      element.addEventListener(e, handleEvent, {
        capture,
        passive,
      })
    })
  }

  const _resetTimer = () => {
    clearInterval(timer.current)
    timer.current = null
  }

  const _handleTimeOut = () => {
    _unbindEvents()
    _resetTimer()
    dispatch(userInactiveAction())
  }

  const _startTimer = () => {
    if (!timer.current) {
      inActiveTime.current = 0
      timer.current = setInterval(() => {
        if (inActiveTime.current > timeout) {
          _handleTimeOut()
        } else {
          const token = localStorage.getItem("RiotRacersToken")
          if (token) {
            const { exp } = jwtDecode(token)
            if (Date.now() >= (exp - 1000) * 1000) {
              dispatch(renewTokenAction())
            }
            inActiveTime.current += 1
          } else {
            _resetTimer()
            _unbindEvents()
          }
        }
      }, delay)
    }
  }

  useEffect(() => {
    if (isAuthorized) {
      _bindEvents()
      _startTimer()
    }
    return () => {
      _unbindEvents()
      _resetTimer()
    }
  }, [isAuthorized])

  return null
}

export default useIdleMonitor
