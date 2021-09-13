/* eslint-disable no-case-declarations */
import { createReducer } from "@reduxjs/toolkit"
import { initialState } from "../../initialState"
import {
  ADD_ITEM_TO_CART,
  ADD_ITEM_TO_CART_SUCC,
  ADD_ITEM_TO_CART_FAILED,
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_FAILED,
  PAY_CAR,
  PAY_CAR_SUCCESS,
  PAY_CAR_FAILED,
  DELETE_CART,
  DELETE_CART_SUCCESS,
  DELETE_CART_FAILED,
  REMOVE_EXPIRED_ITEM,
} from "./types"

const removeExpiredItem = (state, action) => {
  const { id, assetType } = action.payload
  state.cart.rows = state.cart.rows.filter(
    (ite) => !(ite.id === id && ite.transaction.assetType === assetType)
  )
  state.cart.count -= 1
}

const paySuccess = (state, action) => {
  const { itemId, assetType, data } = action.payload

  state.error = undefined
  state.payLoading = false
  state.paidStatus = data

  state.cart.rows = state.cart.rows.map((ite) => {
    if (ite.id === itemId && ite.transaction.assetType === assetType) {
      return {
        ...ite,
        saleStatus: 4,
      }
    }
    return ite
  })
}

const carReducer = createReducer(initialState.marketPlaceState, {
  [ADD_ITEM_TO_CART]: (state, action) => {
    state.addingToCart = {
      [action.payload.itemId]: true,
    }
    state.buyLoading = true // TODO: REMOVE buyloading
  },
  [ADD_ITEM_TO_CART_SUCC]: (state, action) => {
    state.error = undefined
    state.buyLoading = false // TODO: REMOVE buyloading
    state.addingToCart = {}
    state.assetStatus = action.payload
  },
  [ADD_ITEM_TO_CART_FAILED]: (state, action) => {
    state.addingToCart = {}
    state.buyLoading = false // TODO: REMOVE buyloading
    state.error = action.error
    state.assetStatus = {}
  },

  [GET_CART]: (state) => {
    state.loading = true
  },
  [GET_CART_SUCCESS]: (state, action) => {
    state.error = undefined
    state.loading = false
    state.cart = action.payload
  },
  [GET_CART_FAILED]: (state, action) => {
    state.loading = false
    state.error = action.error
    state.cart = {}
  },

  [DELETE_CART]: (state) => {
    state.deleteLoading = true
  },
  [DELETE_CART_SUCCESS]: (state) => {
    state.error = undefined
    state.deleteLoading = false
  },
  [DELETE_CART_FAILED]: (state, action) => {
    state.deleteLoading = false
    state.error = action.error
  },

  [PAY_CAR]: (state) => {
    state.payLoading = true
  },
  [PAY_CAR_SUCCESS]: paySuccess,
  [PAY_CAR_FAILED]: (state, action) => {
    state.payLoading = false
    state.error = action.error
    state.paidStatus = {}
  },
  [REMOVE_EXPIRED_ITEM]: removeExpiredItem,
})

export default carReducer
