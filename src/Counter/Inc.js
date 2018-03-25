import { render, dispatch } from '../store-provider.js'
import Likes from './Likes'

const Inc = () => `
  <button
    onclick="global.helpers.increment()"
  >
    ${Likes}++
  </button>
`

const increment = () => {
  dispatch(({ likes }) => ({ likes: likes + 1 }))
}

Inc.helpers = { increment }

export default render(Inc)
