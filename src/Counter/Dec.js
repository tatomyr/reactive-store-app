import { dispatch, render } from '../store-provider.js'
import { highlight } from '../fakes.js'

const Dec = ({ dislikes }) => `
  <button
    onclick="global.helpers.Dec.decrement()"
    ${highlight()}
  >
    ${dislikes}--
  </button>
`

const decrement = () => {
  dispatch(({ dislikes }) => ({ dislikes: dislikes - 1 }))
}

Dec.helpers = { decrement }

export default render(Dec, ['dislikes'])
