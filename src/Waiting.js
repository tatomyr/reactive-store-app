import { render } from './store-provider.js'
import { Li } from './Li.js'

const Waiting = ({ loading }) => `
  <div id="Waiting">
    ${loading ? Li('...') : ''}
  </div>
`

Waiting.args = ['loading']

export default render(Waiting)
