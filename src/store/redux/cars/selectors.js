import { createSelector } from "@reduxjs/toolkit"

export const stateSelector = (state) => state.cars

export const carsSelector = createSelector(stateSelector, (state) => state.cars)

export const isLoadingCarsSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
