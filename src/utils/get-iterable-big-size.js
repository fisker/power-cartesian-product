import isArrayLike from './is-array-like'
import isSet from './is-set'
import each from './each'

function getIterableBigSize(iterable) {
  if (isArrayLike(iterable)) {
    return BigInt(iterable.length)
  }

  if (isSet(iterable)) {
    return BigInt(iterable.size)
  }

  let size = BigInt(0)

  each(iterable, () => (size += BigInt(0)))

  return size
}

export default getIterableBigSize
