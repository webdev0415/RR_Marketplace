import { isNumber, isString } from "lodash"

export const delineate = (value) => {
  const base = isNumber(value) ? value.toString() : value
  const parts = base.split(".")
  const intpart = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const decimal = parts[1]
  return `${intpart}.${decimal}`
}

export const formatNum = (value, position = 3) => {
  const base = value || "0"
  const num = isString(base) ? parseFloat(base) : value
  if (!num || position === null) {
    return num
  }
  return delineate(num.toFixed(position))
}
