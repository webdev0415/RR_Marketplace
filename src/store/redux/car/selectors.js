import { createSelector } from "@reduxjs/toolkit"

export const stateSelector = (state) => state.car
export const carSelector = createSelector(stateSelector, (state) => ({
  loading: state.loading,
  error: state.error,
  car: state.car,
  property: state.property,
  selectedCar: state.selectedCar,
  currentCar: state.currentCar,
}))
export const currentCarSelector = createSelector(stateSelector, (state) => ({
  currentCar: state.currentCar,
}))
