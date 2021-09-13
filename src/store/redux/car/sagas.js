import { put, call, takeLatest } from "redux-saga/effects"
import request from "api/request"
import notify from "components/commons/notification"
import { getCarSuccessAction, getCarFailureAction } from "./actions"
import { GET_CAR } from "./types"

function getCarRequest(carId) {
  return request({
    path: `cars/c/${carId}?saleStatus=1`,
    opts: {
      method: "GET",
    },
  })
}

function* getCarSaga({ payload }) {
  try {
    const result = yield call(getCarRequest, payload.carId)
    yield put(getCarSuccessAction(result.data))
  } catch (err) {
    if (err.response) {
      notify({
        title: "Error",
        desc: err.response.data.message,
      })
    }
    yield put(getCarFailureAction(err))
  }
}

const carSaga = [takeLatest(GET_CAR, getCarSaga)]
export default carSaga
