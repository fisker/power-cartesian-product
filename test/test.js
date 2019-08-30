import test from 'ava'
import FastCartesianProduct from '../src'

const product = sets => new FastCartesianProduct(sets)

test('main', t => {
  const combinations = product([[0, 1], ['A', 'B']])
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
      product(() => {})
    },
    TypeError,
    '`sets` should be `Iterable`'
  )
  t.throws(
    () => {
      product([() => {}])
    },
    TypeError,
    'elements in `sets` should be `Iterable`'
  )
  t.throws(
    () => {
      product([[]])
    },
    Error,
    '`sets` should not have empty elements'
  )
})

test('supports `Set`', t => {
  const combinations = product(new Set([new Set([0])]))
  const result = [[0]]
  t.deepEqual(
    Array.from(combinations).map(combination => Array.from(combination)),
    result
  )
})

test('supports `ArrayLike`', t => {
  const elements = {
    length: 1,
    0: 0,
  }
  const combinations = product({
    length: 1,
    0: elements,
  })
  t.deepEqual([...combinations], [[0]])
})

test('supports `Iterable`', t => {
  const iterable = product([[0, 1]])
  const combinations = product([iterable, iterable])
  t.is([...combinations].join('|'), '0,0|0,1|1,0|1,1')
})

test('supports `GeneratorFunction`', t => {
  function* elementsGenerator() {
    yield 0
    yield 1
  }

  function* generator() {
    yield elementsGenerator
    yield elementsGenerator
  }

  t.is([...product(generator)].join('|'), '0,0|0,1|1,0|1,1')
  t.is(
    [...product([elementsGenerator, elementsGenerator])].join('|'),
    '0,0|0,1|1,0|1,1'
  )
})

test('size & bigSize', t => {
  const MAX_ARRAY_LENGTH = 2 ** 32 - 1
  const element = new Array(MAX_ARRAY_LENGTH)
  const {bigSize, size} = product(Array.from({length: 33}, () => element))
  const combinations = product([[0, 1], ['A', 'B']])

  t.is(combinations.size, 4)
  t.is(combinations.bigSize, BigInt(4))

  t.is(size, Infinity)
  t.is(
    bigSize,
    BigInt(
      '772103316315349105706014416063813378269318666861765024749836830511609335567106186231578700102953323105081739246412669785553431723085370935750037827673052894357512235463946499050426982824119747058048805090828544034771248058426863536672304703225363101118206353134873876903786099067350665495893380022607743740081787109375'
    )
    // babel transform to Math.pow, throws TypeError
    // BigInt(MAX_ARRAY_LENGTH) ** BigInt(20)
  )
})

test('get & getIndexes', t => {
  const combinations = product([[0, 1], ['A', 'B']])

  t.deepEqual(combinations.get(2), [1, 'A'])
  t.deepEqual(combinations.getIndexes(2), [1, 0])
})

test('infinity products', t => {
  const element = Array.from({length: 10}, (_, i) => i)
  const combinations = product(Array.from({length: 1024}, () => element))

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
