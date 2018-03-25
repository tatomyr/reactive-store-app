import { highlight } from './fakes.js'

export const Li = item => `
  <li ${highlight()}>
    ${item}
  </li>
`
