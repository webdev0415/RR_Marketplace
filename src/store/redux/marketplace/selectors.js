import { createSelector } from "@reduxjs/toolkit"

export const marketplaceSelector = (state) => state.marketplace

export const cartSelector = createSelector(marketplaceSelector, (state) => ({
  cart: state.cart,
}))

export const isItemInCartSelector = createSelector(
  cartSelector,
  (_, itemIdAndAssetType) => itemIdAndAssetType,
  ({ cart }, itemIdAndAssetType) =>
    cart?.rows
      ?.map((ite) => {
        if (!ite?.transaction) {
          return null
        }
        return `${ite.id}-${ite.transaction.assetType}`
      })
      .includes(itemIdAndAssetType)
)

export const assetStatusSelector = createSelector(
  marketplaceSelector,
  (state) => ({
    assetStatus: state.assetStatus,
  })
)

export const paidStatusSelector = createSelector(
  marketplaceSelector,
  (state) => ({
    paidStatus: state.paidStatus,
  })
)

export const loadingSelector = createSelector(marketplaceSelector, (state) => ({
  loading: state.loading,
  buyLoading: state.buyLoading,
  payLoading: state.payLoading,
  deleteLoading: state.deleteLoading,
}))

export const errorSelector = createSelector(marketplaceSelector, (state) => ({
  error: state.error,
}))

export const cartTotalCountSelector = createSelector(
  marketplaceSelector,
  (state) => ({
    totalCount: state.cart?.count,
  })
)

export const isAddingToCartSelector = createSelector(
  marketplaceSelector,
  (state) => state.addingToCart
)
