import { render } from '../store-provider.js'
import { Li } from './Li.js'

const Waiting = ({ loading }) => Li('...', loading ? '' : 'hidden')

Waiting.willMount = () => { console.info('Waiting will mount') }

Waiting.willRefresh = ({ loading }) => { console.info("I'm Waiting!", loading) }

export default render(Waiting, 'loading')
