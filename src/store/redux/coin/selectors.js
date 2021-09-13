import { createSelector } from "@reduxjs/toolkit"

export const coinStateSelector = (state) => state.coin

export const getBalanceSelector = createSelector(
  coinStateSelector,
  (state) => state.balances
)
