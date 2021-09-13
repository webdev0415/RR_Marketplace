import { createReducer } from "@reduxjs/toolkit"
import { initialState } from "../../initialState"
import { GET_BALANCE, GET_BALANCE_SUCCESS, GET_BALANCE_FAILED } from "./types"

const coinReducer = createReducer(initialState.coingState, {
  [GET_BALANCE]: (state) => {
    state.loading = true
    state.balances = {}
  },
  [GET_BALANCE_SUCCESS]: (state, action) => {
    state.error = undefined
    state.loading = false
    state.balances = action.payload || {}
  },
  [GET_BALANCE_FAILED]: (state) => {
    state.loading = false
    state.error = true
    state.balances = {}
  },
})

export default coinReducer
