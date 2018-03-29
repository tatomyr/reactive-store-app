import { render } from '../store-provider.js'
import { Li } from './Li.js'

const Waiting = ({ loading }) => Li('...', loading ? '' : 'hidden')

export default render(Waiting, 'loading')
