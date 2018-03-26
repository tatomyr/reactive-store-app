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
        const id = tracker.components.unshift(Component)
        tracker.components[0].id = `$${Component.name}-${id}`
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
        .forEach(Component => {
          console.log('rerender:', Component.name)
          document.getElementById(Component.id).outerHTML = wrapWithId(Component(store))(Component.id)
        })
    },
  }

  // Render a Component with a stored data
  const wrapWithId = html => id => html.replace(/<[A-z]+(.|\n)*?>/, match => `${match.slice(0, -1)} id="${id}">`)

  const render = (Component, args) => {
    tracker.add(Component, args)

    if (Component.willMount) Component.willMount()
    // TODO: implement a method to wrap a Component properly
    return () => wrapWithId(Component(store))(Component.id)
  }

  // TODO: implement support for nested store fields
  const getTextField = field => render(store => `<span>${store[field]}</span>`, [field])()

  // Store mutation
  const mutate = callback => {
    const changes = callback(store)
    Object.assign(store, changes)
    console.log('store changes:', changes)

    tracker.rerender(changes)

    return 'TODO'
  }

  return { render, getTextField, mutate }
}
