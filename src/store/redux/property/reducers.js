import { createReducer } from "@reduxjs/toolkit"
import {
  GET_GAS_BALANCE,
  GET_GAS_BALANCE_SUCCESS,
  GET_GAS_BALANCE_FAILED,
} from "./types"

const initialState = {
  loading: true,
  error: undefined,
  gasBalance: 0,
}

const propertyReducer = createReducer(initialState, {
  [GET_GAS_BALANCE]: (state) => {
    state.loading = true
  },
  [GET_GAS_BALANCE_SUCCESS]: (state, action) => {
    state.loading = false
    state.error = null
    state.gasBalance = action.payload
  },
  [GET_GAS_BALANCE_FAILED]: (state, action) => {
    state.loading = false
    state.error = action.payload
  },
})

export default propertyReducer
