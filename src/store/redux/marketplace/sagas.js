import { put, call, takeLatest } from "redux-saga/effects"
import i18n from "i18n"
import request from "api/request"
import notify from "components/commons/notification"
import {
  addItemToCartSuccAction,
  addItemToCartFailAction,
  getCartSuccessAction,
  getCartFailureAction,
  payCarSuccessAction,
  payCarFailureAction,
  deleteCartSuccessAction,
  deleteCartFailureAction,
  removeExpiredItemAction,
  getCartAction,
} from "./actions"
import { getNetworkStatus } from "hooks/useMetaMaskAuth"
import { ETH_TEST_NET } from "constants/apiConfig"
import {
  ADD_ITEM_TO_CART,
  GET_CART,
  PAY_CAR,
  DELETE_CART,
  REMOVE_EXPIRED_ITEM,
} from "./types"

function removeItemFromCartApi({ id, assetType }) {
  return request({
    path: `marketplace/cart/${id}`,
    opts: {
      method: "DELETE",
      data: {
        assetType,
      },
    },
  })
}

function* removeItemFromCartSaga({ payload }) {
  try {
    const result = yield call(removeItemFromCartApi, payload)
    if (result.data.message === "success") {
      yield put(deleteCartSuccessAction())
      yield put(removeExpiredItemAction(payload))
      notify({
        type: "success",
        title: i18n.t("helperText.itemDeletedFromCart"),
      })
    }
  } catch (err) {
    if (err.response) {
      notify({
        title: err.response.data.message,
        desc: err.response.data.errors,
      })
    }
    yield put(deleteCartFailureAction(err))
  }
}

function* removeExpiredItemSaga({ payload }) {
  try {
    // I just try to remove expired item from DB,
    // when the timer after timer runs out
    // I don't catch error or response here.
    yield call(removeItemFromCartApi, payload)
  } catch (error) {
    console.log(error)
  }
}

function addItemToCartApi(params) {
  const { itemId, assetType, captcha } = params
  return request({
    path: `marketplace/buy/${itemId}`,
    opts: {
      method: "POST",
      data: {
        assetType,
        captcha,
      },
    },
  })
}

function* addItemToCartSaga({ payload }) {
  const { itemId, assetType, captcha, callback } = payload
  const params = {
    itemId,
    assetType,
    captcha,
  }
  try {
    const result = yield call(addItemToCartApi, params)
    if (result.data.assetHoldResult) {
      notify({
        type: "success",
        title: i18n.t("helperText.itemAddedToCart"),
      })
      yield put(addItemToCartSuccAction(result.data))
      yield put(getCartAction())
    } else {
      yield put(addItemToCartFailAction(result.data))
      notify({
        title: i18n.t("apologize"),
      })
    }
    if (typeof callback === "function") {
      callback(false)
    }
  } catch (err) {
    if (err.response) {
      notify({
        title: err.response.data.message,
        desc: err.response.data.errors,
      })
    }
    yield put(addItemToCartFailAction(err))
    if (typeof callback === "function") {
      callback(false)
    }
  }
}

function getCartRequest(payload) {
  const { page = 1, size = 24 } = payload || {}
  return request({
    path: `marketplace/cart?page=${page}&size=${size}`,
    opts: {
      method: "GET",
    },
  })
}

function* getCartSaga({ payload }) {
  try {
    const result = yield call(getCartRequest, payload)
    yield put(getCartSuccessAction(result.data))
  } catch (err) {
    if (err.response) {
      notify({
        title: "Error",
        desc: err.response.data.message,
      })
    }
    yield put(getCartFailureAction(err))
  }
}

function payCarRequest(params) {
  const { itemId, assetType, transactionHash } = params
  return request({
    path: `marketplace/prePay/${itemId}`,
    opts: {
      method: "POST",
      data: {
        assetType,
        transactionHash,
      },
    },
  })
}

const unitValue = (price, currency) => {
  switch (currency) {
    case "ETH":
      return price * 1e18
    case "milliether":
      return price * 1e15
    case "microether":
      return price * 1e12
    case "Gwei":
      return price * 1e9
    case "Mwei":
      return price * 1e6
    case "Kwei":
      return price * 1e3
    case "wei":
      return price * 1
    default:
      break
  }
}

async function etherCallRequest({ ethAddress, salePrice, saleCurrency }) {
  const value = unitValue(salePrice, saleCurrency)

  try {
    let result
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts[0]) {
        const transactionParameters = {
          to: ethAddress, // Required except during contract publications.
          from: accounts[0], // must match user's active address.
          value: value.toString(16), // Only required to send ether to the recipient from the initiating external account.
        }

        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        })
        return txHash
      } else {
        notify({
          title: i18n.t("helperText.invalidAccount"),
        })
      }
    }
    return result
  } catch (err) {
    // eslint-disable-next-line
    console.error("Payment Failed")
    throw err
  }
}
function getCarRequest(carId) {
  return request({
    path: `cars/c/${carId}`,
    opts: {
      method: "GET",
    },
  })
}
function getStationRequest(stationId) {
  return request({
    path: `station/${stationId}`,
    opts: {
      method: "GET",
    },
  })
}
function getRacetrackRequest(trackId) {
  return request({
    path: `lands/${trackId}`,
    opts: {
      method: "GET",
    },
  })
}
function getShopRequest(shopId) {
  return request({
    path: `shops/${shopId}`,
    opts: {
      method: "GET",
    },
  })
}

function* payCarSaga({ payload }) {
  const {
    item: {
      id: itemId,
      transaction: { assetType, salePrice, saleCurrency },
    },
  } = payload

  console.log("ETH_TEST_NET", ETH_TEST_NET)

  const isValidChain = yield call(getNetworkStatus)
  if (!isValidChain && !ETH_TEST_NET) {
    notify({
      title: i18n.t("helperText.invalidNetwork"),
    })
    yield put(payCarFailureAction())
  } else {
    try {
      let result
      if (assetType === "car") {
        result = yield call(getCarRequest, itemId)
      } else if (assetType === "gasstation") {
        result = yield call(getStationRequest, itemId)
      } else if (assetType === "racetrackland") {
        result = yield call(getRacetrackRequest, itemId)
      } else if (assetType === "mechanicshop") {
        result = yield call(getShopRequest, itemId)
      }

      // const resultCar = yield call(getCarRequest, carId)
      if (result.data.saleStatus === 2) {
        // notify({
        //   type: "info",
        //   title: i18n.t("helperText.availableToBuy"),
        // })
        const { ethAddress } = result.data

        const resultEther = yield call(etherCallRequest, {
          ethAddress,
          salePrice,
          saleCurrency,
        })
        // const { transactionHash } = resultEther
        if (resultEther) {
          notify({
            type: "success",
            title: i18n.t("helperText.paymentSubmitted"),
          })
          const params = {
            itemId,
            assetType,
            transactionHash: resultEther,
          }
          const { data } = yield call(payCarRequest, params)
          yield put(payCarSuccessAction({ itemId, assetType, data }))
        } else {
          notify({
            title: i18n.t("apologize"),
          })
          yield put(payCarFailureAction())
        }
      } else {
        notify({
          title: i18n.t("helperText.notAvailableToBuy"),
        })
        yield put(payCarFailureAction())
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error(err)
      if (err.response || err.message) {
        notify({
          title: "Error",
          desc: err.response?.data?.message || err?.message,
        })
      }
      yield put(payCarFailureAction(err))
    }
  }
}
const marketplaceSaga = [
  takeLatest(ADD_ITEM_TO_CART, addItemToCartSaga),
  takeLatest(GET_CART, getCartSaga),
  takeLatest(PAY_CAR, payCarSaga),
  takeLatest(DELETE_CART, removeItemFromCartSaga),
  takeLatest(REMOVE_EXPIRED_ITEM, removeExpiredItemSaga),
]
export default marketplaceSaga
