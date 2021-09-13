import { createAction } from "@reduxjs/toolkit"
import { GET_BALANCE, GET_BALANCE_SUCCESS, GET_BALANCE_FAILED } from "./types"

export const getBalanceAction = createAction(GET_BALANCE)
export const getBalanceSuccessAction = createAction(GET_BALANCE_SUCCESS)
export const getBalanceFailureAction = createAction(GET_BALANCE_FAILED)
