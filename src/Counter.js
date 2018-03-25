import { dispatch, render } from './store-provider.js'

const Counter = ({ counter }) => `
  <button onclick="increment()" id="Counter">
    ${counter}++
  </button>
`

Counter.args = ['counter']

const increment = () => {
  dispatch(store => ({ counter: store.counter + 1 }))
}

window.increment = increment // XXX temporary

export default render(Counter)
