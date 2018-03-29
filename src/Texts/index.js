import { render, mutate } from '../store-provider.js'
import { fakeRequest } from '../fakes.js'
import Ol from './Ol.js'

// Text list form
const Texts = () => `
  <form onsubmit="global.helpers.Texts.addItem(event)">
    <input name="text" />
    <button>Add</button>
    ${Ol()}
  </form>
`

// Form submit handler
const addItem = e => {
  e.preventDefault()
  const text = e.target.text.value
  if (text.trim() === '') return null

  mutate(({ loading }) => ({ loading: loading + 1 }))

  fakeRequest().then(delay => {
    mutate(store => ({
      loading: store.loading - 1,
      list: [...store.list, `${text} /${delay}/`],
    }))
  })
}

Texts.helpers = { addItem }

// TODO what exactly does render method do here?
export default render(Texts)
