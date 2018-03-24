import { createStore } from './reactive-store.js'

console.warn('triggered store provider');

// Importing store methods
export const { dispatch, render } = createStore({
  list: [],
  loading: 0,
  counter: 0,
})
