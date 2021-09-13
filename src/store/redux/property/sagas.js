import { put, call, takeLatest } from "redux-saga/effects"
import notify from "components/commons/notification"
import request from "api/request"
import { GET_GAS_BALANCE } from "./types"
import {
  getGasBalanceSuccessAction,
  getGasBalanceFailureAction,
} from "./actions"

export const getGasBalanceRequest = (userId) =>
  request({
    path: `users/${userId}/gas-balance`,
    opts: {
      method: "GET",
    },
  })

function* getGasBalanceSaga({ payload: userId }) {
  try {
    const result = yield call(getGasBalanceRequest, userId)
    yield put(getGasBalanceSuccessAction(result.data?.gasBalance))
  } catch (error) {
    if (error.response) {
      notify({ title: error?.response?.data.message })
    }
    yield put(getGasBalanceFailureAction(error))
  }
}

const propertySaga = [takeLatest(GET_GAS_BALANCE, getGasBalanceSaga)]
export default propertySaga
