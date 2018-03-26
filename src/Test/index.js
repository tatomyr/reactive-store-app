import { render, renderTextField, mutate } from '../store-provider'

// TODO: implement passing props to rendered component
const Test = test => `
  <div>
    ${test}
    <!-- comment -->
    ${render((store) => `
      <button onclick="global.handlers.Test.clickHandler(event, '${test}')">
        ${renderTextField(test)}
      </button>
    `)()}
  </div>
`

export default Test
