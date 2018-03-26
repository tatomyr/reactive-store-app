import Texts from './Texts/index.js'
import Counter from './Counter/index.js'
import Test from './Test'

// Main component (storeless)
export default () => `
  <div>
    ${Texts()}
    <hr />
    ${Counter()}
    <hr />
    ${Test('test1')}
    ${Test('test2')}
  </div>
`
