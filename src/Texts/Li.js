import { highlight } from '../fakes.js'

export const Li = (item, className) => `
  <li
    ${highlight()}
    ${typeof className === 'string' ? `class="${className}"`: ''}
  >
    ${item}
  </li>
`
