import SYMBOL_ITERATOR from './symbol-iterator.js'
import isArrayLike from './is-array-like.js'
import isSet from './is-set.js'
import isFunction from './is-function.js'
import isValue from './is-value.js'
import isGeneratorFunction from './is-generator-function.js'

function isIterable(value) {
  return (
    isValue(value) &&
    (isGeneratorFunction(value) ||
      isFunction(value[SYMBOL_ITERATOR]) ||
      isArrayLike(value) ||
      isSet(value))
  )
}

export default isIterable
