import axios from "axios"
import PropTypes from "prop-types"

const setAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common.Authorization = token
  } else {
    // Delete auth header
    delete axios.defaults.headers.common.Authorization
  }
}

setAuthToken.propTypes = {
  token: PropTypes.string.isRequired,
}
export default setAuthToken
