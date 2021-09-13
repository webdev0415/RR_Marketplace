import { createReducer } from "@reduxjs/toolkit"
import { initialState } from "../../initialState"
import {
  GET_STATIONS,
  GET_STATIONS_SUCCESS,
  GET_STATIONS_FAILED,
} from "./types"

const assetsReducer = createReducer(initialState.assets, {
  [GET_STATIONS]: (state) => {
    state.loading = true
    state.error = undefined
  },
  [GET_STATIONS_SUCCESS]: (state, action) => {
    state.error = undefined
    state.loading = false
    state.stations = action.payload
  },
  [GET_STATIONS_FAILED]: (state, action) => {
    state.loading = false
    state.error = action.error
  },
})

export default assetsReducer
