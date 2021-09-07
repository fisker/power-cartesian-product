import SYMBOL_ITERATOR from './utils/symbol-iterator'
import isFinite from './utils/is-finite'
import each from './utils/each'
import getIterableSize from './utils/get-iterable-size'
import getIterableBigSize from './utils/get-iterable-big-size'
import getIterableElement from './utils/get-iterable-element'
import isIterable from './utils/is-iterable'

class FastCartesianProduct {
  constructor(sets) {
    if (!isIterable(sets)) {
      throw new TypeError('`sets` should be `Iterable`')
    }

    each(sets, (elements) => {
      if (!isIterable(elements)) {
        throw new TypeError('elements in `sets` should be `Iterable`')
      }

      if (getIterableSize(elements) <= 0) {
        throw new Error('`sets` should not has empty elements')
      }
    })

    // TODO: use private field
    this.sets = sets
  }

  getIndexes(index) {
    const setsSize = getIterableSize(this.sets)

    // eslint-disable-next-line unicorn/no-new-array
    const indexes = new Array(setsSize)

    let indexRemaining = index

    for (let setsIndex = 0; setsIndex < setsSize; setsIndex += 1) {
      const combinationIndex = setsSize - setsIndex - 1
      const elements = getIterableElement(this.sets, combinationIndex)
      const elementsSize = getIterableSize(elements)
      let elementsIndex = 0

      if (indexRemaining !== 0) {
        elementsIndex = indexRemaining % elementsSize
        indexRemaining = (indexRemaining - elementsIndex) / elementsSize
      }

      indexes[combinationIndex] = elementsIndex
    }

    return indexes
  }

  get(index) {
    const setsSize = getIterableSize(this.sets)

    // eslint-disable-next-line unicorn/no-new-array
    const combination = new Array(setsSize)

    // TODO: add cache

    let indexRemaining = index

    for (let setsIndex = 0; setsIndex < setsSize; setsIndex += 1) {
      const combinationIndex = setsSize - setsIndex - 1
      const elements = getIterableElement(this.sets, combinationIndex)
      const elementsSize = getIterableSize(elements)
      let elementsIndex = 0

      if (indexRemaining !== 0) {
        elementsIndex = indexRemaining % elementsSize
        indexRemaining = (indexRemaining - elementsIndex) / elementsSize
      }

      combination[combinationIndex] = getIterableElement(
        elements,
        elementsIndex,
      )
    }

    return combination
  }

  [SYMBOL_ITERATOR]() {
    // eslint-disable-next-line unicorn/no-this-assignment
    const instance = this
    const {size} = instance
    let index = 0

    return {
      next() {
        const done = index >= size
        const value = instance.get(index)

        index += 1

        return {
          value,
          done,
        }
      },
    }
  }

  get size() {
    let size = 1

    each(this.sets, (elements) => {
      const elementsSize = getIterableSize(elements)
      size *= elementsSize
      if (!isFinite(size)) {
        return false
      }
    })

    return size
  }

  get bigSize() {
    // eslint-disable-next-line node/no-unsupported-features/es-builtins
    let size = BigInt(1)

    each(this.sets, (elements) => {
      const elementsSize = getIterableBigSize(elements)
      size *= elementsSize
    })

    return size
  }
}

// TODO: use class static property
// rollup-plugin-babel can't use proposal-class-properties
FastCartesianProduct.SYMBOL_ITERATOR = SYMBOL_ITERATOR

export default FastCartesianProduct
