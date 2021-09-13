import { createReducer } from "@reduxjs/toolkit"
import { initialState } from "../../initialState"
import {
  GET_ALL_CARS,
  GET_ALL_CARS_SUCCESS,
  GET_ALL_CARS_FAILED,
  RESET_ALL_CARS,
} from "./types"

const carsReducer = createReducer(initialState.carsState, {
  [GET_ALL_CARS]: (state) => {
    state.loading = true
    state.error = undefined
    state.cars = {}
  },
  [GET_ALL_CARS_SUCCESS]: (state, action) => {
    state.error = undefined
    state.loading = false
    state.cars = action.payload
  },
  [GET_ALL_CARS_FAILED]: (state, action) => {
    state.loading = false
    state.error = action.error
    state.cars = {}
  },
  [RESET_ALL_CARS]: (state) => {
    state.loading = true
    state.error = undefined
    state.cars = {}
  },
})

export default carsReducer
