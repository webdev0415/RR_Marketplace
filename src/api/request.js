import { BASE_URL } from "constants/apiConfig"
import axios from "axios"

const request = async ({ path, opts = {} }) => {
  const result = await axios({
    url: `${BASE_URL}/api/${path}`,
    headers: {
      authorization: localStorage.getItem("RiotRacersToken"),
      "Content-Type": "application/json",
    },
    ...opts,
  })

  return result
}

export default request
