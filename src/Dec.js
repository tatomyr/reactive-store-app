import { dispatch, render } from './store-provider.js'
import { highlight } from './fakes.js'

const Dec = ({ dislikes }) => `
  <button
    onclick="window.decrecment()"
    ${highlight()}
    id="Dec"
  >
    ${dislikes}--
  </button>
`

const decrecment = () => {
  dispatch(({ dislikes }) => ({ dislikes: dislikes - 1 }))
}

window.decrecment = decrecment // XXX temporary

export default render(Dec, ['dislikes'])
