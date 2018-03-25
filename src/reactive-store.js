console.log('triggered reactive store file')

// Store module
export const createStore = defaults => {
  // Store
  const store = { ...defaults }
  console.log('triggered store constructor:', store)

  // Track each rendered component
  const tracker = {
    components: new Set([]),
    add: (Component, args) => {
      Component.args = args
      const prevSize = tracker.components.size
      Component.index = prevSize
      tracker.components.add(Component)
      if (tracker.components.size - prevSize !== 0) {
        console.warn('added tracker:',tracker, Component.name, ':',Component)
      }
      // return prevSize
    },
    rerender: changes => {
      const changedArgs = Object.keys(changes)
      const components = [...tracker.components]
      components.filter(({ args }) => changedArgs.some(arg => args.includes(arg))).forEach(item => {
        console.log('rerender:', item)
        document.getElementById(item.name).outerHTML = item(store)
      })
    },
  }

  // Render a Component with a stored data
  const render = (Component, args = []) => {
    tracker.add(Component, args)

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
