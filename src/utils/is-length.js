// https://github.com/lodash/lodash/blob/master/isLength.js

const MAX_SAFE_INTEGER = 9_007_199_254_740_991

export default (value) =>
  typeof value === 'number' &&
  value > -1 &&
  value % 1 === 0 &&
  value <= MAX_SAFE_INTEGER
