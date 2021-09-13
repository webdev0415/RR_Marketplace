import { createSelector } from "@reduxjs/toolkit"
import defaultImage from "assets/images/user.png"

export const authStateSelector = (state) => state.auth

export const getUserSelector = createSelector(
  authStateSelector,
  (auth) => auth.user
)

export const getProfilePictureSelector = createSelector(
  getUserSelector,
  (user) => {
    if (user.profile_picture) {
      return user.profile_picture.uri
    }
    return defaultImage
  }
)
export const isAuthorizedSelector = createSelector(
  authStateSelector,
  (state) => state.isLoggedIn && state.isMetaMaskLoggedIn
)
