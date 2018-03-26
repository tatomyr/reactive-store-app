import { createStore } from './reactive-store.js'

console.log('triggered store provider')

// Importing store methods
export const { render, getTextField, mutate } = createStore({
  list: [],
  loading: 0,
  likes: 0,
  dislikes: 0,
})
