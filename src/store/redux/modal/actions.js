import { createAction } from "@reduxjs/toolkit"
import { OPEN_MODAL, CLOSE_MODAL } from "./types"

export const openModalAction = createAction(OPEN_MODAL)
export const closeModalAction = createAction(CLOSE_MODAL)
