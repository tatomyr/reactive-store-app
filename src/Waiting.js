import { render } from './store-provider.js'
import { Li } from './Li.js'

const Waiting = ({ loading }) => `
  <div id="Waiting">
    ${loading ? Li('...') : ''}
  </div>
`

export default render(Waiting, ['loading'])
