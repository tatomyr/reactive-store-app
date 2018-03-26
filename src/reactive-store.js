console.log('triggered reactive store file')

/**
 * Store module constructor that should be invoked once to create a singleton with reactive data
 *
 * @param defaults - an object that should contain init values for the store
 * @return an object that contains public methods to manage the store created
 */
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
      if (args.length) {
        Component.args = args
        const id = tracker.components.unshift(Component)
        tracker.components[0].id = `$${Component.name}-${id}`
        console.warn('added tracker:', Component.name, tracker.components)
      }

      // TODO: delete it and implement global helpers store (maybe action/reducer pattern?)
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
        .forEach(component => {
          console.log('rerender:', component.name)
          if (component.willRefresh) component.willRefresh(store)
          document.getElementById(component.id).outerHTML = wrapWithId(component)
        })
    },
  }

  const wrapWithId = Component => Component.id
    ? Component(store)
      .trim()
      .replace(/<[A-z]+(.|\n)*?>/, match => `${match.slice(0, -1)} id="${Component.id}">`)
    : Component(store).trim()

  /**
   * Returns funcion to be invoked
   *
   * @param Component - a function that retuns a string which represents a valid html tag with its content
   * @param ...args - an optional list of arguments (specifically they are the store fields). If not any - the Component will not rerender later on
   * @return function to be invoked later on
   */
  const render = (Component, ...args) => {
    tracker.add(Component, args)

    if (Component.willMount) Component.willMount(store)
    // TODO: implement a method to wrap a Component properly
    return () => wrapWithId(Component) 
  }

  /**
   * Returns a text field value wrapped in <span> tag
   *
   * @param field - a string name of a field to be rendered
   * @return string
   */
  // TODO: implement support for nested store fields
  const renderTextField = field => render(store => `<span>${store[field]}</span>`, field)()

  /**
   * Store mutation method
   *
   * @param callback - a callback function that will take the store as a single argunent and retuns an object that represents store changes
   */
  const mutate = callback => {
    const changes = callback(store)
    Object.assign(store, changes)
    console.log('store changes:', changes)

    tracker.rerender(changes)

    return 'TODO'
  }

  return { render, renderTextField, mutate }
}

// TODO: implement routing
