import { put, call, takeLatest } from "redux-saga/effects"
import request from "api/request"
import notify from "components/commons/notification"
import { getStationsSuccessAction, getStationsFailureAction } from "./actions"
import { GET_STATIONS } from "./types"

function getStationsRequest(params) {
  const { page, size, saleStatus, currentDrop } = params
  return request({
    path: `station/?page=${page}&size=${size}&saleStatus=${saleStatus}&currentDrop=${currentDrop}`,
    opts: {
      method: "GET",
    },
  })
}

function* getStationsSaga({ payload }) {
  try {
    const result = yield call(getStationsRequest, payload)
    yield put(getStationsSuccessAction(result.data))
  } catch (err) {
    if (err.response) {
      notify({
        title: "Error",
        desc: err.response.data.message,
      })
    }
    yield put(getStationsFailureAction(err))
  }
}

const stationSaga = [takeLatest(GET_STATIONS, getStationsSaga)]
export default stationSaga
