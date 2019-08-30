import SYMBOL_ITERATOR from './symbol-iterator'
import isArrayLike from './is-array-like'
import isFunction from './is-function'
import isGeneratorFunction from './is-generator-function'

function iterableEach(iterable, iteratee) {
  const iterator = iterable[SYMBOL_ITERATOR]()
  let index = -1

  while (true) {
    index += 1
    const {value, done} = iterator.next()

    if (done) {
      break
    }

    const shouldContinue = iteratee(value, index, iterator)

    if (shouldContinue === false) {
      break
    }
  }
}

function forEach(value, iteratee) {
  const {length} = value
  for (let index = 0; index < length; index += 1) {
    const shouldContinue = iteratee(value[index], index, value)

    /* istanbul ignore if  */
    if (shouldContinue === false) {
      break
    }
  }
}

function each(iterable, iteratee) {
  if (isGeneratorFunction(iterable)) {
    iterable = iterable()
  }

  if (isFunction(iterable[SYMBOL_ITERATOR])) {
    return iterableEach(iterable, iteratee)
  }

  /* istanbul ignore else  */
  if (isArrayLike(iterable)) {
    return forEach(iterable, iteratee)
  }
}

export default each
