import test from 'ava'
import FastCartesianProduct from './src/core'

test('main', t => {
  const combinations = new FastCartesianProduct([[0, 1], ['A', 'B']])
  const result = [[0, 'A'], [0, 'B'], [1, 'A'], [1, 'B']]

  t.deepEqual(Array.from(combinations).join(), result.join())

  t.deepEqual(new Set(combinations), new Set(result))

  let i = 0
  for (const combination of combinations) {
    t.deepEqual(combination, result[i])
    i += 1
  }
})

test('empty check', t => {
  t.throws(
    () => {
      new FastCartesianProduct(() => {})
    },
    TypeError,
    '`sets` should be `Iterable`'
  )
  t.throws(
    () => {
      new FastCartesianProduct([() => {}])
    },
    TypeError,
    'elements in `sets` should be `Iterable`'
  )
  t.throws(
    () => {
      new FastCartesianProduct([[]])
    },
    Error,
    '`sets` should not have empty elements'
  )
})

test('supports `Set`', t => {
  const combinations = new FastCartesianProduct(
    new Set([new Set([0, 1]), new Set([0, 1])])
  )
  const result = [[0, 0], [0, 1], [1, 0], [1, 1]]
  t.deepEqual(
    Array.from(combinations).map(combination => Array.from(combination)),
    result
  )
})

test('infinity products', t => {
  const element = Array.from({length: 10}, (_, i) => i)
  const combinations = new FastCartesianProduct(
    Array.from({length: 1024}, () => element)
  )

  // yes, we can access index over max Array length
  const MAX_ARRAY_LENGTH = 2 ** 32 - 1

  t.is(combinations.size, Infinity)
  t.is(
    combinations.get(MAX_ARRAY_LENGTH + MAX_ARRAY_LENGTH).join(''),
    `${'0'.repeat(1024 - 10)}8589934590`
  )
  t.is(
    combinations.get(Number.MAX_SAFE_INTEGER).join(''),
    `${'0'.repeat(1024 - 16)}9007199254740991`
  )
  t.is(
    combinations.get(Number.MAX_VALUE).join(''),
    `${'0'.repeat(
      1024 - 309
    )}179769313486231680088648464220646842686668242844028646442228680066046004606080400844208228060084840044686866242482868202680268820402884062800406622428864666882406066422426822086680426404402040202424880224808280820888844286620802664406086660842040886824002682662666864246642840408646468824200860804260804068888`
  )
})
