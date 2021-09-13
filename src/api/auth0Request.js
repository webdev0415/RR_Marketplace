import { AUTH0_BASE_URL } from "constants/apiConfig"
import axios from "axios"

const request = async ({ path, opts = {} }) => {
  const updatedOpts = {
    ...opts,
    data: {
      ...opts.data,
      client_id: process.env.REACT_APP_AUTH_0_CLIENT_ID,
      client_secret: process.env.REACT_APP_AUTH_0_CLIENT_SECRET_TOKEN,
    },
  }
  const result = await axios({
    url: `${AUTH0_BASE_URL}/${path}`,
    ...updatedOpts,
    headers: {
      "Content-Type": "application/json",
    },
  })

  return result
}

export default request
