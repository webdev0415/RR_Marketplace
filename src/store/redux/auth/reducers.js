import { createReducer } from "@reduxjs/toolkit"
import { initialState } from "../../initialState"
import {
  OPT_SEND,
  OTP_SENT_SUCCESS,
  OTP_SENT_FAILED,
  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
  AUTHENTICATION,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILED,
  INITIAL_AUTHENTICATE,
  INITIAL_AUTHENTICATE_SUCCESS,
  INITIAL_AUTHENTICATE_FAILED,
} from "./types"

const authReducer = createReducer(initialState.authState, {
  [AUTHENTICATION]: (state) => ({
    ...state,
  }),
  [AUTHENTICATION_SUCCESS]: (state, action) => {
    let isLoggedIn = false
    if (action.payload.token) {
      localStorage.setItem("RiotRacersToken", action.payload.token)
      state.token = action.payload.token
    }
    if (action.payload.user.email) {
      isLoggedIn = true
      state.user = action.payload.user
    }
    state.loading = false
    state.error = undefined
    state.isMetaMaskLoggedIn = true
    state.isLoggedIn = isLoggedIn
  },
  [AUTHENTICATION_FAILED]: (state, action) => {
    state.loading = false
    state.error = action.error
    state.isMetaMaskLoggedIn = false
    state.isLoggedIn = false
  },
  [OPT_SEND]: (state, action) => {
    if (state.user) {
      state.user.email = action.payload.email
      state.user.publicAddress = action.payload.publicAddress
      state.user.username = action.payload.username
    }
  },
  [OTP_SENT_SUCCESS]: (state, action) => {
    state.user = { ...state.user, ...action.payload }
    state.error = undefined
  },
  [OTP_SENT_FAILED]: (state, action) => {
    state.error = action.payload
  },
  [VERIFY_OTP]: (state) => ({
    ...state,
  }),
  [VERIFY_OTP_SUCCESS]: (state, action) => {
    state.error = null
    state.user = { ...state.user, ...action.payload }
  },
  [VERIFY_OTP_FAILED]: (state, action) => ({ ...state, error: action.payload }),
  [INITIAL_AUTHENTICATE]: (state) => ({
    ...state,
  }),
  [INITIAL_AUTHENTICATE_SUCCESS]: (state, action) => ({
    ...state,
    isLoggedIn: true,
    isMetaMaskLoggedIn: true,
    user: { ...action.payload },
  }),
  [INITIAL_AUTHENTICATE_FAILED]: (state) => ({
    ...state,
    isLoggedIn: false,
    isMetaMaskLoggedIn: false,
    user: {},
  }),
  [LOGIN_USER]: (state) => ({
    ...state,
  }),
  [LOGIN_USER_SUCCESS]: (state, action) => {
    if (action.payload.token) {
      localStorage.setItem("RiotRacersToken", action.payload.token)
    }
    return {
      ...state,
      loading: false,
      isLoggedIn: true,
      isMetaMaskLoggedIn: true,
      user: { ...action.payload.user },
    }
  },
  [LOGIN_USER_FAILED]: (state) => ({ ...state, loading: false }),
  [LOGOUT_USER]: (state) => {
    localStorage.removeItem("RiotRacersToken")
    return {
      ...state,
      isLoggedIn: false,
      isMetaMaskLoggedIn: false,
      user: {},
    }
  },
})

export default authReducer
