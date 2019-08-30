import SYMBOL_ITERATOR from './symbol-iterator'
import isArrayLike from './is-array-like'
import isSet from './is-set'
import isFunction from './is-function'
import isValue from './is-value'
import isGeneratorFunction from './is-generator-function'

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
