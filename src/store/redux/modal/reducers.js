import { createReducer } from "@reduxjs/toolkit"
import { initialState } from "../../initialState"
import { OPEN_MODAL, CLOSE_MODAL } from "./types"

const modalReducer = createReducer(initialState.modalState, {
  [OPEN_MODAL]: (state, action) => {
    state.isOpen = true
    state.type = action.modalType
    state.step = action.step
  },
  [CLOSE_MODAL]: (state) => {
    state.isOpen = false
    state.type = null
    state.step = null
  },
})

export default modalReducer
