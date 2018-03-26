import { createStore } from './reactive-store.js'

console.log('triggered store provider')

// Initialize store and export store methods
export const { render, renderTextField, mutate } = createStore({
  list: [],
  loading: 0,
  likes: 0,
  dislikes: 0,
  test1: true,
  test2: false,
  testSwitcher: (e, test) => {
    console.log(111,e.target, test)
    mutate(store => ({ [test]: !store[test] }))
  },
})

// Set global handlers
window.global.handlers = {
  Test: {
    clickHandler: (e, test) => {
      console.log(111,e.target, test)
      mutate(store => ({ [test]: !store[test] }))
    },
  },

}
