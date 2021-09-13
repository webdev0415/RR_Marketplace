import { put, call, takeLatest } from "redux-saga/effects"
import request from "api/request"
import notify from "components/commons/notification"
import { getSettingsSuccessAction, getSettingsFailureAction } from "./actions"
import { GET_SETTINGS } from "./types"

function getSettingsRequest() {
  return request({
    path: `setting`,
    opts: {
      method: "GET",
    },
  })
}

function* getSettingsSaga() {
  try {
    const result = yield call(getSettingsRequest)
    yield put(getSettingsSuccessAction(result.data))
  } catch (err) {
    if (err.response) {
      notify({
        title: "Error",
        desc: err.response.data.message,
      })
    }
    yield put(getSettingsFailureAction(err))
  }
}

const settingsSaga = [takeLatest(GET_SETTINGS, getSettingsSaga)]
export default settingsSaga
