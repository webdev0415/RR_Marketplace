/* eslint-disable no-case-declarations */
import { createReducer } from "@reduxjs/toolkit"
import { initialState } from "../../initialState"
import { GET_LANDS, GET_LANDS_SUCCESS, GET_LANDS_FAILED } from "./types"

const assetsReducer = createReducer(initialState.lands, {
  [GET_LANDS]: (state) => {
    state.loading = true
    state.error = undefined
  },
  [GET_LANDS_SUCCESS]: (state, action) => {
    state.error = undefined
    state.loading = false
    state.lands = action.payload
  },
  [GET_LANDS_FAILED]: (state, action) => {
    state.loading = false
    state.error = action.error
  },
})

export default assetsReducer
