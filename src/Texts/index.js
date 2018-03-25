import { render, dispatch } from '../store-provider.js'
import { fakeRequest } from '../fakes.js'
import Ol from './Ol.js'

// Text list form
const Texts = () => `
  <form onsubmit="global.helpers.addItem(event)">
    <input name="text" />
    <button>Add</button>
    ${Ol}
  </form>
`

// Form submit handler
const addItem = e => {
  e.preventDefault()
  const text = e.target.text.value
  if (text.trim() === '') return null

  dispatch(({ loading }) => ({ loading: loading + 1 }))

  fakeRequest().then(delay => {
    dispatch(store => ({
      loading: store.loading - 1,
      list: [...store.list, `${text} /${delay}/`],
    }))
  })
}

Texts.helpers = { addItem }

export default render(Texts)
