import isValue from './is-value.js'

const {hasOwnProperty} = Object.prototype

export default (object, property) =>
  isValue(object) && hasOwnProperty.call(object, property)
