import isFunction from './is-function.js'

function isGeneratorFunction(value) {
  return (
    isFunction(value) &&
    value.constructor &&
    value.constructor.name === 'GeneratorFunction'
  )
}

export default isGeneratorFunction
