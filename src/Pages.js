import { render } from './store-provider'
import Texts from './Texts'
import Counter from './Counter'
import Bool from './Bool'
import Test from './Test'

// Main component (storeless)
const Pages = ({ route }) => `
  <div>
    ${{
      texts: Texts(),
      counter: Counter(),
      bool: `
        ${Bool('bool1')}
        ${Bool('bool2')}
      `,
      test: Test(),
    }[route]}
  </div>
`

export default render(Pages, 'route')
