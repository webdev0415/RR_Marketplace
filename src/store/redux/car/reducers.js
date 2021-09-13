import { createReducer } from "@reduxjs/toolkit"
import { initialState } from "../../initialState"
import { GET_CAR, GET_CAR_SUCCESS, GET_CAR_FAILED } from "./types"

const carReducer = createReducer(initialState.carState, {
  [GET_CAR]: (state) => {
    state.loading = true
    state.currentCar = null
  },
  [GET_CAR_SUCCESS]: (state, action) => {
    state.error = undefined
    state.loading = false
    state.currentCar = action.payload
  },
  [GET_CAR_FAILED]: (state, action) => {
    state.loading = false
    state.error = action.error
    state.currentCar = null
  },
})

export default carReducer
