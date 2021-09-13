import request from "./request"

export const fetchActivities = () =>
  request({
    path: "users/activities",
    opts: {
      method: "GET",
    },
  })
export const checkUsernameApi = (username) =>
  request({
    path: `users/username/${username}`,
    opts: {
      method: "GET",
    },
  })

export const checkEmailApi = (email, publicAddress) =>
  request({
    path: `users?email=${email}&publicAddress=${publicAddress}`,
    opts: {
      method: "GET",
    },
  })
