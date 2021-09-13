import { createAction } from "@reduxjs/toolkit"
import * as types from "./types"

export const handleAuthenticationAction = createAction(types.AUTHENTICATION)
export const authenticateSuccessAction = createAction(
  types.AUTHENTICATION_SUCCESS
)
export const authenticateFailureAction = createAction(
  types.AUTHENTICATION_FAILED
)
export const sendOTPAction = createAction(types.OPT_SEND)
export const sendOTPSuccessAction = createAction(types.OTP_SENT_SUCCESS)
export const sendOTPFailureAction = createAction(types.OTP_SENT_FAILED)

export const verifyOTPAction = createAction(types.VERIFY_OTP)
export const verifyOTPSuccessAction = createAction(types.VERIFY_OTP_SUCCESS)
export const verifyOTPFailureAction = createAction(types.VERIFY_OTP_FAILED)

export const initialAuthenticateAction = createAction(
  types.INITIAL_AUTHENTICATE
)
export const initialAuthenticateSuccessAction = createAction(
  types.INITIAL_AUTHENTICATE_SUCCESS
)
export const initialAuthenticateFailureAction = createAction(
  types.INITIAL_AUTHENTICATE_FAILED
)

export const loginUserAction = createAction(types.LOGIN_USER)
export const loginUserSuccessAction = createAction(types.LOGIN_USER_SUCCESS)
export const loginUserFailureAction = createAction(types.LOGIN_USER_FAILED)

export const updateUserAction = createAction(types.UPDATE_USER)

export const userInactiveAction = createAction(types.USER_INACTIVE)
export const logoutAction = createAction(types.LOGOUT_USER)

export const renewTokenAction = createAction(types.RENEW_TOKEN)

// export const handleAuthentication = (publicAddress, signature, email) => ({
//   type: constant.AUTHENTICATION,
//   publicAddress,
//   signature,
//   email,
// })

// export const authenticateSuccess = (payload) => ({
//   type: constant.AUTHENTICATION_SUCCESS,
//   payload,
// })

// export const authenticateFailure = (error) => ({
//   type: constant.AUTHENTICATION_FAILED,
//   error,
// })

// export const sendOTP = (
//   email,
//   publicAddress,
//   onSuccess,
//   onError,
//   checkEmail
// ) => ({
//   type: constant.OPT_SEND,
//   email,
//   publicAddress,
//   onSuccess,
//   onError,
//   checkEmail,
// })

// export const sendOTPSuccess = (payload) => ({
//   type: constant.OTP_SENT_SUCCESS,
//   payload,
// })

// export const sendOTPFailure = (error) => ({
//   type: constant.OTP_SENT_FAILED,
//   error,
// })

// export const verifyOTP = (otp, email, onSuccess, onError) => ({
//   type: constant.VERIFY_OTP,
//   otp,
//   email,
//   onSuccess,
//   onError,
// })

// export const verifyOTPSuccess = (payload) => ({
//   type: constant.VERIFY_OTP_SUCCESS,
//   payload,
// })

// export const verifyOTPFailure = (error) => ({
//   type: constant.VERIFY_OTP_FAILED,
//   error,
// })

// export const initialAuthenticate = () => ({
//   type: constant.INITIAL_AUTHENTICATE,
// })

// export const initialAuthenticateSuccess = (user) => ({
//   type: constant.INITIAL_AUTHENTICATE_SUCCESS,
//   user,
// })

// export const initialAuthenticateFailure = () => ({
//   type: constant.INITIAL_AUTHENTICATE_FAILED,
// })

// export const logout = () => ({
//   type: constant.LOGOUT_USER,
// })

// export const loginUser = (publicAddress, email) => ({
//   type: constant.LOGIN_USER,
//   publicAddress,
//   email,
// })

// export const loginUserSuccess = (payload) => ({
//   type: constant.LOGIN_USER_SUCCESS,
//   payload,
// })

// export const loginUserFailure = (error) => ({
//   type: constant.LOGIN_USER_FAILED,
//   error,
// })

// export const updateUserAction = (payload) => ({
//   payload,
//   type: constant.UPDATE_USER,
// })
