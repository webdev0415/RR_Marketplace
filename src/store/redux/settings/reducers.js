/* eslint-disable no-case-declarations */
import { createReducer } from "@reduxjs/toolkit"
import { initialState } from "../../initialState"
import {
  GET_SETTINGS,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAILED,
} from "./types"

const settingsReducer = createReducer(initialState.settingsState, {
  [GET_SETTINGS]: (state) => {
    state.loading = true
  },
  [GET_SETTINGS_SUCCESS]: (state, action) => {
    state.error = undefined
    state.loading = false
    state.settings = action.payload
  },
  [GET_SETTINGS_FAILED]: (state, action) => {
    state.loading = false
    state.error = action.error
    state.settings = null
  },
})

export default settingsReducer
