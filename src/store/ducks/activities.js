import { put, call, takeLatest } from "redux-saga/effects"
import { initialState } from "../initialState"
import { fetchActivities } from "api/users"

const GET_USER_ACTIVITIES_REQ = "[user activities] get user activities request"
const GET_USER_ACTIVITIES_SUCC = "[user activities] get user activities success"
const GET_USER_ACTIVITIES_FAIL = "[user activities] get user activities failed"

export const getUserActivitiesAction = () => ({
  type: GET_USER_ACTIVITIES_REQ,
})

export default function activitiesReducer(
  state = initialState.activities,
  action
) {
  switch (action.type) {
    case GET_USER_ACTIVITIES_REQ:
      return {
        ...state,
        loading: true,
        entities: [],
      }
    case GET_USER_ACTIVITIES_SUCC:
      return {
        ...state,
        error: undefined,
        entities: action.payload,
        loading: false,
      }
    case GET_USER_ACTIVITIES_FAIL:
      return {
        ...state,
        error: true,
        balances: [],
        loading: false,
      }
    default:
      return state
  }
}

export const activitiesSelector = (state) => {
  const { activities: activityState } = state
  return {
    loading: activityState.loading,
    activities: activityState.entities,
  }
}

function* getActivitesSaga() {
  try {
    const { data: activities } = yield call(fetchActivities)
    yield put({
      type: GET_USER_ACTIVITIES_SUCC,
      payload: activities,
    })
  } catch (error) {
    yield put({
      type: GET_USER_ACTIVITIES_FAIL,
      payload: error,
    })
  }
}

export const activitiesSaga = [
  takeLatest(GET_USER_ACTIVITIES_REQ, getActivitesSaga),
]
