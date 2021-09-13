import { put, call, takeLatest, select } from "redux-saga/effects"
import i18n from "i18n"
import { isEmpty } from "lodash"
import notify from "components/commons/notification"
import request from "api/request"
import auth0Request from "api/auth0Request"
import {
  OPT_SEND,
  VERIFY_OTP,
  LOGIN_USER,
  UPDATE_USER,
  AUTHENTICATION,
  INITIAL_AUTHENTICATE,
  RENEW_TOKEN,
  USER_INACTIVE,
} from "./types"
import {
  authenticateSuccessAction,
  authenticateFailureAction,
  sendOTPSuccessAction,
  sendOTPFailureAction,
  verifyOTPSuccessAction,
  verifyOTPFailureAction,
  initialAuthenticateSuccessAction,
  initialAuthenticateFailureAction,
  loginUserSuccessAction,
  loginUserFailureAction,
  logoutAction,
} from "./actions"
import { openModalAction, closeModalAction } from "../modal/actions"

export function checkUserEmail(email, publicAddress) {
  return request({
    path: `users?email=${email}&publicAddress=${publicAddress}`,
    opts: {
      method: "GET",
    },
  })
}

function create(data) {
  return request({
    path: "users",
    opts: {
      method: "POST",
      data,
    },
  })
}

function authenticateApi(publicAddress, signature, email) {
  return request({
    path: "auth",
    opts: {
      method: "POST",
      data: {
        publicAddress,
        signature,
        email,
      },
    },
  })
}

function* loginUserSaga({ payload }) {
  const { publicAddress, username, email, history } = payload
  try {
    const result = yield call(create, { publicAddress, username, email })
    yield put(loginUserSuccessAction(result.data))
  } catch (err) {
    yield put(loginUserFailureAction(err.message))
  }
}

function* authenticateSaga({ payload }) {
  try {
    const { publicAddress, signature, email, history } = payload
    const result = yield call(authenticateApi, publicAddress, signature, email)
    yield put(authenticateSuccessAction(result.data))
    if (history && history.push) {
      if (!isEmpty(result.data?.user)) {
        yield put(closeModalAction())
        yield call(history.push, "/dashboard/cars")
      }
    }
  } catch (err) {
    if (err.response) {
      notify({ title: err.response.data.message })
    }
    yield put(authenticateFailureAction(err.message))
  }
}

export function sendOTPRequest(email) {
  return auth0Request({
    path: "passwordless/start",
    opts: {
      method: "POST",
      data: {
        email,
        connection: "email",
        send: "code",
      },
    },
  })
}

function* sendOTPSaga({ payload }) {
  const { email, publicAddress, onSuccess, onError } = payload
  try {
    const usersRes = yield call(checkUserEmail, email)
    if (!usersRes.data.isEmailValid) {
      const errMsg = publicAddress
        ? "This email is associated with another Ethereum address!"
        : "This email is associated with another person!"
      yield call(onError, errMsg)
      if (publicAddress) {
        yield put(sendOTPFailureAction(errMsg))
      }
      return
    }

    const result = yield call(sendOTPRequest, email)
    yield put(sendOTPSuccessAction(result.data))
    yield call(onSuccess)
  } catch (err) {
    yield call(onError, "Something went wrong when sending the email.")
    yield put(sendOTPFailureAction(err.message))
  }
}

function verifyOTPRequest(otp, email) {
  return auth0Request({
    path: "oauth/token",
    opts: {
      method: "POST",
      data: {
        grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
        username: email,
        otp,
        realm: "email",
      },
    },
  })
}

function* verifyOTPSaga({ payload }) {
  const { code, email, onSuccess, onError } = payload
  try {
    const result = yield call(verifyOTPRequest, code, email)
    yield put(verifyOTPSuccessAction(result.data))
    yield call(onSuccess)
  } catch (err) {
    yield call(onError)
    yield put(verifyOTPFailureAction(err.message))
  }
}

function initialAuthenticateRequest() {
  return request({
    path: "users/authenticate",
    opts: {
      method: "GET",
    },
  })
}

function* initialAuthenticateSaga() {
  try {
    const result = yield call(initialAuthenticateRequest)
    yield put(initialAuthenticateSuccessAction(result.data.user))
  } catch (err) {
    yield put(initialAuthenticateFailureAction(err.message))
  }
}

function updateUserApi(payload, userId) {
  return request({
    path: `users/${userId}`,
    opts: {
      method: "PUT",
      data: payload,
    },
  })
}

export function checkUsername(username) {
  return request({
    path: `users/username/${username}`,
    opts: {
      method: "GET",
    },
  })
}

function* updateUserSaga({ payload }) {
  try {
    const cUser = yield select((state) => state.auth.user)
    const { data } = yield call(updateUserApi, payload, cUser.id)
    notify({ type: "success", title: i18n.t("updateSucc") })

    yield put(sendOTPSuccessAction(data.user))

    if (typeof payload.cb === "function") {
      payload.cb()
    }
  } catch (error) {
    const errMsg = error?.response?.data?.message || i18n.t("apologize")
    notify({ title: errMsg })
  }
}

export const renewTokenApi = () =>
  request({
    path: "users/renew-token",
    opts: {
      method: "GET",
    },
  })

function* renewTokenSaga() {
  try {
    const { data } = yield call(renewTokenApi)
    localStorage.setItem("RiotRacersToken", data.token)
  } catch (error) {
    yield put(logoutAction())
  }
}
function* userInactiveSaga() {
  yield put(logoutAction())
  yield put(openModalAction({ type: "authModal", step: 2 }))
}
const authSaga = [
  takeLatest(AUTHENTICATION, authenticateSaga),
  takeLatest(OPT_SEND, sendOTPSaga),
  takeLatest(VERIFY_OTP, verifyOTPSaga),
  takeLatest(INITIAL_AUTHENTICATE, initialAuthenticateSaga),
  takeLatest(LOGIN_USER, loginUserSaga),
  takeLatest(UPDATE_USER, updateUserSaga),
  takeLatest(USER_INACTIVE, userInactiveSaga),
  takeLatest(RENEW_TOKEN, renewTokenSaga),
]
export default authSaga
