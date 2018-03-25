import './style.css'
import { App } from './App.js'
// TODO implement helpers `global` accessability
import { increment } from './Inc.js' // TODO

// Render page
const mount = app => {
  document.getElementById('root').innerHTML = app()
  document.querySelector('input').focus() // XXX
}

(() => {
  mount(App)
})()
