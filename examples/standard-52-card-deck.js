import FastCartesionProduct from '../src/index.js'

const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const suits = '♣♦♥♠'

const deck = new FastCartesionProduct([ranks, suits])

console.log([...deck])
