import { dispatch } from './store-provider.js'
import Likes from './Likes'

export default `
  <button
    onclick="window.increment()"
  >
    ${Likes}++
  </button>
`

export const increment = () => {
  dispatch(({ likes }) => ({ likes: likes + 1 }))
}

window.increment = increment // XXX temporary
