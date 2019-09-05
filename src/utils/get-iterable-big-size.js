import isArrayLike from './is-array-like'
import isSet from './is-set'
import each from './each'

function getIterableBigSize(iterable) {
  if (isArrayLike(iterable)) {
    // eslint-disable-next-line node/no-unsupported-features/es-builtins
    return BigInt(iterable.length)
  }

  if (isSet(iterable)) {
    // eslint-disable-next-line node/no-unsupported-features/es-builtins
    return BigInt(iterable.size)
  }

  // eslint-disable-next-line node/no-unsupported-features/es-builtins
  let size = BigInt(0)

  // eslint-disable-next-line node/no-unsupported-features/es-builtins
  each(iterable, () => (size += BigInt(0)))

  return size
}

export default getIterableBigSize
