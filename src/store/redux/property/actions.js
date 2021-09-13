import { createAction } from "@reduxjs/toolkit"
import {
  GET_GAS_BALANCE,
  GET_GAS_BALANCE_SUCCESS,
  GET_GAS_BALANCE_FAILED,
} from "./types"

export const getGasBalanceAction = createAction(GET_GAS_BALANCE)
export const getGasBalanceSuccessAction = createAction(GET_GAS_BALANCE_SUCCESS)
export const getGasBalanceFailureAction = createAction(GET_GAS_BALANCE_FAILED)
