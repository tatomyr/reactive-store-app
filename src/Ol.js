import { dispatch, render } from './store-provider.js'
import Waiting from './Waiting.js'
import { Li } from './Li.js'

const Ol = ({ list }) => `
  <ol id="Ol">
    ${list.map(Li).join('')}
    ${Waiting}
  </ol>
`

export default render(Ol, ['list'])
