# power-cartesian-product

> powerful cartesian product

this module was named `fast-cartesian-product` before `v0.0.3`, now it's split into to two modules:

- [`fast-cartesian-product`](https://github.com/fisker/fast-cartesian-product)

  focusing on speed, and only work on arrays

- [`power-cartesian-product`](https://github.com/fisker/power-cartesian-product)

  focusing on unlimited combinations, less memory, more data types

## Examples

```js
import PowerCartesianProduct from 'power-cartesian-product'

const inputs = [
  [0, 1],
  ['A', 'B'],
]

for (const combination of new PowerCartesianProduct(inputs)) {
  console.log(combination)
}
```

more examples

```sh
git clone https://github.com/fisker/power-cartesian-product.git
cd fast-cartesian-product
yarn
node -r esm examples/standard-52-card-deck.js
node -r esm examples/any-iterable-type.js
node -r esm examples/big-combinations.js
```

## Files

```text
lib/
├─ index.common.js  ( CommonJS )
├─ index.js         ( UMD )
├─ index.min.js     ( UMD, compressed )
├─ index.mjs        ( ES Module )
└─ index.min.mjs    ( ES Module, compressed )
```

## API

### combinations = new PowerCartesianProduct(sets)

Returns: combinations

#### sets

type: `iterable | arrayLike | GeneratorFunction`

\*notice: `GeneratorFunction` is supported, not `generator` yet, [#57](https://github.com/fisker/power-cartesian-product/pull/57)

#### combinations

instance of `PowerCartesianProduct`

it's not `Array`, also no `length`

to get `Array`

```js
[...combinations]

// OR

Array.from(...combinations)

// OR

const array = []

let (const combination of combinations) {
  array.push(combination)
}

// es5

var array = []
var iterator = combinations[PowerCartesianProduct.SYMBOL_ITERATOR]()
var data
while (!(data = iterator.next()).done) {
  array.push(data.value)
}
```

to get `Set`

```js
new Set(combinations)
```

#### PowerCartesianProduct#get(index)

get nth combination

Returns: `array`

```js
// 3rd combination
new PowerCartesianProduct([
  [0, 1],
  ['A', 'B'],
]).get(2)
// -> [1, 'A']
```

#### PowerCartesianProduct#getIndexes(index)

get nth combination indexes

Returns: `array<number>`

```js
// 3rd combination indexes
new PowerCartesianProduct([
  [0, 1],
  ['A', 'B'],
]).getIndexes(2)
// -> [1, 0]
```

#### PowerCartesianProduct#size

a getter to get `size` of combinations, this might be `Infinity` for big combinations.

Returns: `int | infinity`

```js
new PowerCartesianProduct([
  [0, 1],
  ['A', 'B'],
]).size
// -> 4

new PowerCartesianProduct(new Array(256).fill(new Array(16))).size
// -> Infinity
```

#### PowerCartesianProduct#bigSize

a getter to get BigInt `size` of combinations.

Returns: `BigInt`

```js
new PowerCartesianProduct([
  [0, 1],
  ['A', 'B'],
]).bigSize
// -> 4n

new PowerCartesianProduct(new Array(33).fill(new Array(2 ** 32 - 1))).bigSize
// -> 772103316315349105706014416063813378269318666861765024749836830511609335567106186231578700102953323105081739246412669785553431723085370935750037827673052894357512235463946499050426982824119747058048805090828544034771248058426863536672304703225363101118206353134873876903786099067350665495893380022607743740081787109375n
```

#### PowerCartesianProduct.SYMBOL_ITERATOR

symbol to get Iterator,
for environment without `Symbol`, it's string `@@iterator`, otherwise it's `Symbol.iterator`

if you are not sure, you should always use `combinations[PowerCartesianProduct.SYMBOL_ITERATOR]()`

```js
var iterator = combinations[PowerCartesianProduct.SYMBOL_ITERATOR]()
iterator.next() // {value: [0, 1], done: false}
```
