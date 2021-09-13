import { createSelector } from "@reduxjs/toolkit"
import { keyBy } from "lodash"

export const settingsStateSelector = (state) => state.settings

export const settingsSelector = createSelector(
  settingsStateSelector,
  (state) => ({
    settings: state.settings,
  })
)

export const settingsByNameSelector = createSelector(
  settingsStateSelector,
  ({ settings }) => keyBy(settings, "settingName")
)

export const currentDropNumberSelector = createSelector(
  settingsByNameSelector,
  (settingsByName) => settingsByName?.currentDropNumber?.settingNumber
)

export const timeToCompletePaymentSelector = createSelector(
  settingsByNameSelector,
  (settingsByName) => settingsByName?.timeToCompletePayment?.settingNumber
)
