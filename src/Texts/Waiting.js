import { render } from '../store-provider.js'
import { Li } from './Li.js'

const Waiting = ({ loading }) => `
  <div>
    ${loading ? Li('...') : ''}
  </div>
`

Waiting.willMount = () => { console.info('Waiting will mount') }

export default render(Waiting, ['loading'])
