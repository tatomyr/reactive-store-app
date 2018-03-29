import { createStore } from './reactive-store.js'

console.log('triggered store provider')

// Initialize store and export store methods
export const { render, renderTextField, mutate } = createStore({
  list: [],
  loading: 0,
  likes: 0,
  dislikes: 0,
  bool1: true,
  bool2: false,
  test: 'Random!',
  // helpers: {
  //   testSwitcher: (e, bool) => {
  //     console.log(111,e.target, bool)
  //     mutate(store => ({ [bool]: !store[bool] }))
  //   }
  // },
  route: 'texts',
})

// Set global handlers
window.global.handlers = {
  Bool: {
    clickHandler: (e, bool) => {
      mutate(store => ({ [bool]: !store[bool] }))
    },
  },
  Pages: {
    showPage: (e, route) => {
      mutate(store => ({ route }))
    }
  },
  Test: {
    getRandom: () => {
      mutate(() => ({ test: Math.random() }))
    }
  },

}
