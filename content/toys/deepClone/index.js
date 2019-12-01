const obj = {
  a: {
    b: 1
  }
}

const produce = (base, fn) => {
  const proxy = createProxy(base)
  let result = fn(proxy)
  return result.copy
}

const createProxy = base => {
  const state = {
    modified: false,
    base,
    drafts: {},
    copy: null
  }
  let proxy = new Proxy(state, objectTraps)
  state.draft = proxy
  return proxy
}

const objectTraps = {
  get(state, prop) {
    let { drafts } = state
    if (!state.modified) {
      return drafts[prop]
    }
    return state.copy[prop]
  },
  set(state, prop, value) {
    if (!state.modified) {
      state.modified = true
      state.copy = Array.isArray(state.base)
        ? state.base.slice()
        : { ...state.base }
    }
    state.copy[prop] = value
    return true
  }
}

const newObj = produce(obj, draf => {
  draf.a.b = 2
  return draf
})

console.log(obj, newObj)
