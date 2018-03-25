import { dispatch, render } from './store-provider.js'

const Counter = ({ counter }) => `
  <button
    onclick="window.increment()"
    id="Counter"
  >
    ${counter}++
  </button>
`

const increment = () => {
  dispatch(store => ({ counter: store.counter + 1 }))
}

window.increment = increment // XXX temporary

export default render(Counter, ['counter'])
