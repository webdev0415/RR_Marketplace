import { put, call, takeLatest } from "redux-saga/effects"
import request from "api/request"
import notify from "components/commons/notification"
import { getAllCarsSuccessAction, getAllCarsFailureAction } from "./actions"
import { GET_ALL_CARS } from "./types"

function getAllCarsRequest(params) {
  return request({
    path: `cars/all`,
    opts: {
      params,
      method: "GET",
    },
  })
}

function* getAllCarsSaga({ payload }) {
  try {
    const result = yield call(getAllCarsRequest, payload)
    yield put(getAllCarsSuccessAction(result.data))
  } catch (err) {
    if (err.response) {
      notify({
        title: "Error",
        desc: err.response.data.message,
      })
    }
    yield put(getAllCarsFailureAction(err))
  }
}

const carsSaga = [takeLatest(GET_ALL_CARS, getAllCarsSaga)]
export default carsSaga
