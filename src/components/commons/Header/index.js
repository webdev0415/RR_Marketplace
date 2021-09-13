import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { openModalAction } from "store/redux/modal/actions"
import { authStateSelector } from "store/redux/auth/selectors"
import { logoutAction } from "store/redux/auth/actions"

import useMetaMaskAuth from "hooks/useMetaMaskAuth"
import useWindowDimensions from "hooks/useWindowDimensions"
import { IPAD_PORTRAIT } from "constants/breakPoints"

import DesktopHeader from "./DesktopHeader"
import MobileHeader from "./MobileHeader"

function Header() {
  const dispatch = useDispatch()

  const authState = useSelector(authStateSelector)
  const { handleAuth } = useMetaMaskAuth(onMetaMaskNotInstalled)
  const { width } = useWindowDimensions()
  const isSmallDevice = width <= IPAD_PORTRAIT

  function onMetaMaskNotInstalled() {
    dispatch(openModalAction("authModal", 3))
  }

  const OpenModal = () => {
    dispatch(openModalAction("authModal", 2))
  }

  const handleLogout = () => {
    dispatch(logoutAction())
  }

  return isSmallDevice ? (
    <MobileHeader
      {...{
        authState,
        handleLogout,
        OpenModal,
        handleAuth,
      }}
    />
  ) : (
    <DesktopHeader
      {...{
        handleLogout,
        OpenModal,
      }}
    />
  )
}

export default Header
