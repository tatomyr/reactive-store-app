console.log('triggered reactive store file')

// Store module
export const createStore = defaults => {
  // Store
  const store = { ...defaults }
  console.log('triggered store constructor:', store)

  // Global helpers
  window.global = { ...(window.global || {}) }

  // Track each rendered component
  const tracker = {
    components: new Set([]),
    add: (Component, args) => {
      Component.args = args
      const prevSize = tracker.components.size
      Component.index = prevSize
      tracker.components.add(Component)
      if (tracker.components.size - prevSize === 1) {
        const { helpers } = Component
        console.log(2222222, helpers);
        if (helpers) {
          console.log(global, helpers);
          // FIXME: helpers function in `window.global` should be related to corresponding Components names
          console.log({helpers: { ...window.global.helpers, ...helpers }},333);
          window.global = { ...window.global, helpers: { ...window.global.helpers, ...helpers } }
          console.log(global);
        }
        console.warn('added tracker:',tracker, Component.name, ':',Component)
      }
      // return prevSize
    },
    rerender: changes => {
      const changedArgs = Object.keys(changes)
      const components = [...tracker.components]
      // FIXME: we should not add rendering methods to tracker if it doesn't contain `args`
      components.filter(({ args }) => args && changedArgs.some(arg => args.includes(arg))).forEach(item => {
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
