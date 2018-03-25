import { dispatch } from './store-provider.js'
import Ol from './Ol.js'
import { fakeRequest } from './fakes.js'
import Inc from './Inc.js'
import Dec from './Dec.js'

// Form submit handler
function addItem(e) {
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

window.addItem = addItem // XXX temporary

// Main component (storeless)
export const App = () => `
  <form onsubmit=" addItem(event)">
    <input name="text" />
    <button>Add</button>
    ${Ol}
  </form>
  <hr />
  ${Inc}
  ${Dec}
`
