import isArrayLike from './is-array-like.js'
import each from './each.js'

function getIterableElement(iterable, index) {
  // prefer arrayLike
  if (isArrayLike(iterable)) {
    return iterable[index]
  }

  let element

  each(iterable, (value, currentIndex) => {
    if (index === currentIndex) {
      element = value
      return false
    }
  })

  return element
}

export default getIterableElement
