import isArrayLike from './is-array-like.js'
import isSet from './is-set.js'
import each from './each.js'

function getIterableSize(iterable) {
  if (isArrayLike(iterable)) {
    return iterable.length
  }

  if (isSet(iterable)) {
    return iterable.size
  }

  let size = 0

  each(iterable, () => (size += 1))

  return size
}

export default getIterableSize
