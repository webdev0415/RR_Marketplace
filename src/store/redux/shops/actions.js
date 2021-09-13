import { createAction } from "@reduxjs/toolkit"
import { GET_SHOPS, GET_SHOPS_SUCCESS, GET_SHOPS_FAILED } from "./types"

export const getShopsAction = createAction(GET_SHOPS)
export const getShopsSuccessAction = createAction(GET_SHOPS_SUCCESS)
export const getShopsFailureAction = createAction(GET_SHOPS_FAILED)
