/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-debugger */
import { put, call, takeLatest } from "redux-saga/effects"
import request from "api/request"
import notify from "components/commons/notification"
import { getShopsSuccessAction, getShopsFailureAction } from "./actions"
import { GET_SHOPS } from "./types"

function getShopsRequest(params) {
  const { page, size, saleStatus, currentDrop } = params
  return request({
    path: `shops/?page=${page}&size=${size}&saleStatus=${saleStatus}&currentDrop=${currentDrop}`,
    opts: {
      method: "GET",
    },
  })
}

function* getShopsSaga({ payload }) {
  try {
    const result = yield call(getShopsRequest, payload)
    yield put(getShopsSuccessAction(result.data))
  } catch (err) {
    if (err.response) {
      notify({
        title: "Error",
        desc: err.response.data.message,
      })
    }
    yield put(getShopsFailureAction(err))
  }
}

const Shopsaga = [takeLatest(GET_SHOPS, getShopsSaga)]
export default Shopsaga
