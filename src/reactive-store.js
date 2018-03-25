console.warn('triggered reactive store file')

// Store module
export const createStore = defaults => {
  // Store
  const store = { ...defaults }
  console.warn('triggered store constructor:', store)

  // Track each rendered component
  const tracker = new Set([]);

  // Render a Component with a stored data
  const render = Component => {
    const size = tracker.size
    tracker.add(Component)
    if (tracker.size - size) console.warn('added tracker:',tracker, Component.name, ':',Component)

    return Component(store)
  }

  // XXX - just for fun
  const parseArgs = stringifiedFunction => {
    const roroArgs = stringifiedFunction.match(/\(\{.*?\}\)/)[0]
    const arrayOfArgs = roroArgs.match(/(\w+,)*(\w+)/g)
    return new Set(arrayOfArgs)
  }

  // Store mutation
  const dispatch = callback => {
    const changes = callback(store)
    Object.assign(store, changes)
    console.log('store changes:', changes)

    /* replacement */
    const changedParams = Object.keys(changes)
    // const componentsToRerender = [...tracker].filter(item => changedParams.includes(name))
    // console.log(changedParams ,'---->', componentsToRerender);
    /* */
    // TODO rewrite to be triggered for changes keys only
    tracker.forEach(item => {
      const setOfArgs = parseArgs(item.toString())
      console.log(changedParams,[...setOfArgs],'*****', !!changedParams.filter(param => setOfArgs.has(param)), '-->',item.name,'/',document.getElementById(item.name))
      if (changedParams.filter(param => setOfArgs.has(param)).length)
        document.getElementById(item.name).outerHTML = item(store)
    })

    return 'TODO'
  }

  return { render, dispatch }
}
