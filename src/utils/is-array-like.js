import isLength from './is-length.js'
import isValue from './is-value.js'
import isFunction from './is-function.js'

function isArrayLike(value) {
  return isValue(value) && !isFunction(value) && isLength(value.length)
}

export default isArrayLike
