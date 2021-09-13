import { createAction } from "@reduxjs/toolkit"
import {
  GET_SETTINGS,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_FAILED,
} from "./types"

export const getSettingsAction = createAction(GET_SETTINGS)
export const getSettingsSuccessAction = createAction(GET_SETTINGS_SUCCESS)
export const getSettingsFailureAction = createAction(GET_SETTINGS_FAILED)
