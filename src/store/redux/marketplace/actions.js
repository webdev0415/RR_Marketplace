import { createAction } from "@reduxjs/toolkit"
import {
  BUY_CAR,
  BUY_CAR_SUCCESS,
  BUY_CAR_FAILED,
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
  ADD_ITEM_TO_CART,
  ADD_ITEM_TO_CART_SUCC,
  ADD_ITEM_TO_CART_FAILED,
} from "./types"

export const buyCarAction = createAction(BUY_CAR)
export const buyCarSuccessAction = createAction(BUY_CAR_SUCCESS)
export const buyCarFailureAction = createAction(BUY_CAR_FAILED)

export const addItemToCartAction = createAction(ADD_ITEM_TO_CART)
export const addItemToCartSuccAction = createAction(ADD_ITEM_TO_CART_SUCC)
export const addItemToCartFailAction = createAction(ADD_ITEM_TO_CART_FAILED)

export const getCartAction = createAction(GET_CART)
export const getCartSuccessAction = createAction(GET_CART_SUCCESS)
export const getCartFailureAction = createAction(GET_CART_FAILED)

export const deleteCartAction = createAction(DELETE_CART)
export const deleteCartSuccessAction = createAction(DELETE_CART_SUCCESS)
export const deleteCartFailureAction = createAction(DELETE_CART_FAILED)

export const payCarAction = createAction(PAY_CAR)
export const payCarSuccessAction = createAction(PAY_CAR_SUCCESS)
export const payCarFailureAction = createAction(PAY_CAR_FAILED)

export const removeExpiredItemAction = createAction(REMOVE_EXPIRED_ITEM)
