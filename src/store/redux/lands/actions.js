import { createAction } from "@reduxjs/toolkit"
import { GET_LANDS, GET_LANDS_SUCCESS, GET_LANDS_FAILED } from "./types"

export const getLandsAction = createAction(GET_LANDS)
export const getLandsSuccessAction = createAction(GET_LANDS_SUCCESS)
export const getLandsFailureAction = createAction(GET_LANDS_FAILED)
