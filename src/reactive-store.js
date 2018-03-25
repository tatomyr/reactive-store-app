console.log('triggered reactive store file')

// Store module
export const createStore = defaults => {
  // Store
  const store = { ...defaults }
  console.log('triggered store constructor:', store)

  // Global helpers init
  window.global = { ...(window.global || {}) }
  window.global.helpers = { ...(window.global.helpers || {}) }

  // Track each rendered component
  const tracker = {
    components: [],
    add: (Component, args) => {
      if (args) {
        Component.args = args
        tracker.components.unshift(Component)
        console.warn('added tracker:', Component.name, tracker.components)
      }

      const { helpers } = Component
      if (helpers) {
        window.global.helpers = { ...window.global.helpers, [Component.name]: helpers }
        console.warn('added helpers for:', Component.name)
      }

      return 'TODO'
    },
    rerender: changes => {
      const changedArgs = Object.keys(changes)
      tracker.components
        .filter(({ args }) => changedArgs.some(arg => args.includes(arg)))
        .forEach(item => {
          console.log('rerender:', item.name)
          document.getElementById(item.name).outerHTML = item(store)
        })
    },
  }

  // Render a Component with a stored data
  const render = (Component, args) => {
    tracker.add(Component, args)

    if (Component.willMount) Component.willMount()
    return Component(store)
  }

  // Store mutation
  const dispatch = callback => {
    const changes = callback(store)
    Object.assign(store, changes)
    console.log('store changes:', changes)

    tracker.rerender(changes)

    return 'TODO'
  }

  return { render, dispatch }
}
