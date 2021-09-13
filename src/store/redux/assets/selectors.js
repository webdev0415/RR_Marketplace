import { createSelector } from "@reduxjs/toolkit"

export const assetsStateSelector = (state) => state.assets
export const getStationsSelector = createSelector(
  assetsStateSelector,
  (state) => ({
    stations: state.assets.stations,
  })
)
export const loadingStateSelector = createSelector(
  assetsStateSelector,
  (state) => ({
    loading: state.assets.loading,
  })
)
// export const getStationsSelector = (state) => {
//   const { stations } = state.assets
//   return stations
// }
