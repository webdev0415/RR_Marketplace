import { createSelector } from "@reduxjs/toolkit"

export const shopsStateSelector = (state) => state.shops

export const getShopsSelector = createSelector(shopsStateSelector, (state) => ({
  shops: state.shops.shops,
}))

export const loadingStateSelector = createSelector(
  shopsStateSelector,
  (state) => ({
    loading: state.assets.loading,
  })
)
