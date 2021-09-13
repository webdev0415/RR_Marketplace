/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-debugger */
import { put, call, takeLatest } from "redux-saga/effects"
import request from "api/request"
import notify from "components/commons/notification"
import { getLandsSuccessAction, getLandsFailureAction } from "./actions"
import { GET_LANDS } from "./types"

function getLandsRequest(params) {
  const { page, size, saleStatus, currentDrop } = params
  return request({
    path: `lands/?page=${page}&size=${size}&saleStatus=${saleStatus}&currentDrop=${currentDrop}`,
    opts: {
      method: "GET",
    },
  })
}

function* getLandsSaga({ payload }) {
  try {
    const result = yield call(getLandsRequest, payload)
    yield put(getLandsSuccessAction(result.data))
  } catch (err) {
    if (err.response) {
      notify({
        title: "Error",
        desc: err.response.data.message,
      })
    }
    yield put(getLandsFailureAction(err))
  }
}

const landsSaga = [takeLatest(GET_LANDS, getLandsSaga)]
export default landsSaga
