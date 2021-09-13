import { createAction } from "@reduxjs/toolkit"
import {
  GET_ALL_CARS,
  RESET_ALL_CARS,
  GET_ALL_CARS_SUCCESS,
  GET_ALL_CARS_FAILED,
} from "./types"

export const getAllCarsAction = createAction(GET_ALL_CARS)
export const getAllCarsSuccessAction = createAction(GET_ALL_CARS_SUCCESS)
export const getAllCarsFailureAction = createAction(GET_ALL_CARS_FAILED)

export const resetCarsAction = createAction(RESET_ALL_CARS)
