import { createSelector } from "@reduxjs/toolkit"

export const gasStateSelector = (state) => state.property

export const getGasBalanceSelector = createSelector(
  gasStateSelector,
  (state) => state?.gasBalance
)
