console.log('triggered reactive store file')

/**
 * Store module constructor that should be invoked once to create a singleton with reactive data
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
    add: (component, args) => {
      if (args.length) {

        /*
        * TODO implement hierarhical structure of rendered components:
        ```
        [
          {
            component: a function which return a string representation of an html element,
            id: try to set id manually at first; this will be unique id of the component and a related DOM element,
            parent: null or id of a parent component (see the previous field),
          },
          ...
        ]
        ```
        * This way we will know if the tracker should trigger rerendering of this particular component
        */

        component.args = args
        const id = tracker.components.unshift(component)
        tracker.components[0].id = `$${component.name}-${id}`
        console.warn('added tracker:', component.name, tracker.components)
      }

      // TODO: delete it and implement global helpers store (maybe action/reducer pattern?)
      const { helpers } = component
      if (helpers) {
        window.global.helpers = { ...window.global.helpers, [component.name]: helpers }
        console.warn('added helpers for:', component.name)
      }

      return 'TODO'
    },
    rerender: changes => {
      const changedArgs = Object.keys(changes)
      tracker.components
        .filter(({ args }) => changedArgs.some(arg => args.includes(arg)))
        .forEach(component => {
          console.log('rerender:', component.name)
          document.getElementById(component.id).outerHTML = wrapWithId(component)
        })
    },
  }

  const wrapWithId = component => {
    const renderedComponent = component(store)//.trim()

    return component.id
      ? renderedComponent
        .replace(/<[A-z]+(.|\n)*?>/, match => `${match.slice(0, -1)} id="${component.id}">`)
      : renderedComponent
  }

  /**
   * Returns funcion to be invoked
   * @param component - a function that retuns a string which represents a valid html tag with its content
   * @param ...args - an optional list of arguments (specifically they are the store fields). If not any - the component will not rerender later on
   * @return function to be invoked later on
   */
  const render = (component, ...args) => {
    tracker.add(component, args)

    // TODO: implement a method to wrap a component properly
    return () => wrapWithId(component)
  }

  /**
   * Returns a text field value wrapped in <span> tag
   * @param field - a string name of a field to be rendered
   * @return string
   */
  // TODO: implement support for nested store fields
  // TODO prevent adding anonymous functions to tracker multiple times || remove this feature
  const renderTextField = field => {
    const component = store => `<span>${store[field]}</span>`
    return render(component, field)()
    // render(store => `<span>${store[field]}</span>`, field)()
  }

  /**
   * Store mutation method
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
// TODO implement passing props through render method
// TODO implement unique app identifier `app` (e.g. global[app].dispatch("ACTION", payload))
// TODO prevent adding a same tracker twice
