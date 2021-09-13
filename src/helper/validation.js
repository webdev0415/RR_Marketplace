import i18n from "../i18n"

/**
 * validateEmail
 * validates email address
 * @author Ravin Patel
 * @param {string} email - email address to be validated
 * @return {string | null} if email doesn't passe validation return error message
 */
export const validateEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  if (!re.test(email)) {
    return i18n.t("validation.validateEmail")
  }
  return null
}

/**
 * validateMinimum
 * validates on a minimum character length
 * @param {string} value - value to be validated
 * @param {number} min - minimum character length allowed
 * @return {string | null} if value is less than the minimum, returns an error message
 */
export const validateMinimum = (value, min) => {
  if (value?.length < min || !value) {
    return i18n.t("validation.validateMinimum", { min })
  }
  return null
}

/**
 * validateMinimum
 * validates on a minimum character length
 * @param {string} value - value to be validated
 * @param {number} max - maximum character length allowed
 * @return {boolean} if value is more than the maximum, returns an error message
 */
export const validateMaximum = (value, max) => {
  if (value?.length > max) {
    return i18n.t("validation.validateMaximum", { max })
  }
  return null
}

/**
 * validateUsername
 * validates username
 * @param {string} value - value to be validated
 * @return {boolean} if username doesn't passe validation return error message
 */
export const validateUsername = (value) => {
  if (
    !value ||
    !/^[a-zA-Z0-9_]+$/.test(value) ||
    value?.length < 3 ||
    value?.length > 20
  ) {
    return i18n.t("validation.validateUsername")
  }
  return null
}

/**
 * validateInteger
 * validates integer
 * @param {string} value - value to be validated
 * @return {null | string} if the value is an integer return nul
 */

export const validateInteger = (value) => {
  if (!/^\d+$/.test(value)) {
    return i18n.t("validation.validateInteger")
  }
  return null
}
