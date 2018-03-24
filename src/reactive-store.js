console.warn('triggered reactive store file');

// Store module
export const createStore = defaults => {
  // Store
  const store = Object.assign({}, defaults) // { ...defaults }
  console.warn('triggered store constructor:', store);

  let tracker = new Set([]);

  // XXX - just for fun
  const parseArgs = strf => {
    const roroArgs = strf.match(/\(\{.*?\}\)/)[0]
    const arrayOfArgs = roroArgs.match(/(\w+,)*(\w+)/g)
    return new Set(arrayOfArgs)
  }

  const dispatch = callback => {
    let obj
    Object.assign(store, obj = callback(store))
    console.log('store changes:', obj);

    // TODO rewrite to be triggered for obj keys only
    tracker.forEach(item => {
      const changedParams = Object.keys(obj)
      const setOfArgs = parseArgs(item.toString())
      console.log(changedParams,[...setOfArgs],'*****', !!changedParams.filter(param => setOfArgs.has(param)), '-->',item.name,'/',document.getElementById(item.name))
      if (changedParams.filter(param => setOfArgs.has(param)).length)
        document.getElementById(item.name).outerHTML = item(store)
    })

    return 'TODO'
  }

  // Rendering method
  const render = Component => {
    const size = tracker.size
    tracker.add(Component)
    if (tracker.size - size) console.warn('added tracker:',tracker, Component.name, ':',Component);

    return Component(store)
  }

  return { dispatch, render }
}
