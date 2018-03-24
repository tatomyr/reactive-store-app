import { dispatch } from './store-provider.js'
import Ol from './Ol.js'
import Counter from './Counter.js'
import { fakeRequest } from './fakes.js'

// Form submit handler
function addItem(e) {
  e.preventDefault()
  const text = e.target.text.value
  if (text.trim() === '') return null

  dispatch(store => ({ loading: store.loading + 1 }))

  fakeRequest().then(delay => {
    dispatch(store => ({
      loading: store.loading - 1,
      list: [...store.list, `${text} /${delay}/`],
    }))
  })
}

window.addItem = addItem // XXX temporary

// Main component (storeless)
export const App = () => `
  <form onsubmit=" addItem(event)">
    <input name="text" />
    <button>Add</button>
    ${Ol}
  </form>
  ${Counter}
`
