/* eslint-disable no-case-declarations */
import { createReducer } from "@reduxjs/toolkit"
import { initialState } from "../../initialState"
import { GET_SHOPS, GET_SHOPS_SUCCESS, GET_SHOPS_FAILED } from "./types"

const assetsReducer = createReducer(initialState.shops, {
  [GET_SHOPS]: (state) => {
    state.loading = true
    state.error = undefined
  },
  [GET_SHOPS_SUCCESS]: (state, action) => {
    state.error = undefined
    state.loading = false
    state.shops = action.payload
  },
  [GET_SHOPS_FAILED]: (state, action) => {
    state.loading = false
    state.error = action.error
  },
})

export default assetsReducer
