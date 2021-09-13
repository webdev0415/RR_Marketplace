import { createAction } from "@reduxjs/toolkit"
import { GET_CAR, GET_CAR_SUCCESS, GET_CAR_FAILED } from "./types"

export const getCarAction = createAction(GET_CAR)
export const getCarSuccessAction = createAction(GET_CAR_SUCCESS)
export const getCarFailureAction = createAction(GET_CAR_FAILED)
