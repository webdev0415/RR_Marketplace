import { createAction } from "@reduxjs/toolkit"
import {
  GET_STATIONS,
  GET_STATIONS_SUCCESS,
  GET_STATIONS_FAILED,
} from "./types"

export const getStationsAction = createAction(GET_STATIONS)
export const getStationsSuccessAction = createAction(GET_STATIONS_SUCCESS)
export const getStationsFailureAction = createAction(GET_STATIONS_FAILED)
