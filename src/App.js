// import Texts from './Texts/index.js'
// import Counter from './Counter/index.js'
// import Test from './Test'
import Pages from './Pages'

// Main component (storeless)
export default () => `
  <div>
    <button onclick="global.handlers.Pages.showPage(event, 'texts')">To Texts</button>
    <button onclick="global.handlers.Pages.showPage(event, 'counter')">To Counter</button>
    <button onclick="global.handlers.Pages.showPage(event, 'bool')">To Bool</button>
    <button onclick="global.handlers.Pages.showPage(event, 'test')">To Test</button>
    ${Pages()}
  </div>
`

// export default () => `
//   <div>
//     ${Texts()}
//     <hr />
//     ${Counter()}
//     <hr />
//     ${Test('bool1')}
//     ${Test('bool2')}
//   </div>
// `
