# power-cartesian-product

> powerful cartesian product

## Examples

```js
import PowerCartesianProduct from 'power-cartesian-product'

const inputs = [[0, 1], ['A', 'B']]

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

type: `iterable | arrayLike`

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

Returns: `array<array>`

```js
combinations.get(3) // 3rd combination
```

#### PowerCartesianProduct#size

a getter to get `size` of combinations, this might be `Infinity` for big combinations.

Returns: `int | infinity`

```js
combinations.size // 16
```

#### PowerCartesianProduct#bigSize

a getter to get BigInt `size` of combinations.

Returns: `BigInt`

```js
combinations.size // 16n
```

#### PowerCartesianProduct.SYMBOL_ITERATOR

symbol to get Iterator,
for environment without `Symbol`, it's string `@@iterator`, otherwise it's `Symbol.iterator`

if you are not sure, you can always use `combinations[PowerCartesianProduct.SYMBOL_ITERATOR]()`

```js
var iterator = combinations[PowerCartesianProduct.SYMBOL_ITERATOR]()
iterator.next() // {value: [0, 1], done: false}
```
