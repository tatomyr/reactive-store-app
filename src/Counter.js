import { dispatch, render } from './store-provider.js'

const increment = () => {
  dispatch(store => ({ counter: store.counter + 1 }))
}

window.increment = increment // XXX temporary

const Counter = ({ counter }) => `
  <button onclick="increment()" id="Counter">
    ${counter}++
  </button>
`

export default render(Counter)
