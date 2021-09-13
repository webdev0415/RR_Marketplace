import { createSelector } from "@reduxjs/toolkit"

export const landsStateSelector = (state) => state.lands

export const getLandsSelector = createSelector(landsStateSelector, (state) => ({
  lands: state.lands.lands,
}))

export const loadingStateSelector = createSelector(
  landsStateSelector,
  (state) => ({
    loading: state.assets.loading,
  })
)
