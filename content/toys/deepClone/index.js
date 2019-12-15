const MY_IMMER = Symbol('my-immer1')

const isPlainObject = value => {
  if (
    !value ||
    typeof value !== 'object' ||
    {}.toString.call(value) != '[object Object]'
  ) {
    return false
  }
  var proto = Object.getPrototypeOf(value)
  if (proto === null) {
    return true
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor
  return (
    typeof Ctor == 'function' &&
    Ctor instanceof Ctor &&
    Function.prototype.toString.call(Ctor) ===
      Function.prototype.toString.call(Object)
  )
}

const isProxy = value => !!value && !!value[MY_IMMER]

function produce(baseState, fn) {
  const proxies = new Map()
  const copies = new Map()

  const objectTraps = {
    get(target, key) {
      if (key === MY_IMMER) return target
      const data = copies.get(target) || target
      return getProxy(data[key])
    },
    set(target, key, val) {
      const copy = getCopy(target)
      const newValue = getProxy(val)
      // 这里的判断用于拿 proxy 的 target
      // 否则直接 copy[key] = newValue 的话外部拿到的对象是个 proxy
      copy[key] = isProxy(newValue) ? newValue[MY_IMMER] : newValue
      return true
    }
  }

  const getProxy = data => {
    if (isProxy(data)) {
      return data
    }
    if (isPlainObject(data) || Array.isArray(data)) {
      if (proxies.has(data)) {
        return proxies.get(data)
      }
      const proxy = new Proxy(data, objectTraps)
      proxies.set(data, proxy)
      return proxy
    }
    return data
  }

  const getCopy = data => {
    if (copies.has(data)) {
      return copies.get(data)
    }
    const copy = Array.isArray(data) ? data.slice() : { ...data }
    copies.set(data, copy)
    return copy
  }

  const isChange = data => {
    if (proxies.has(data) || copies.has(data)) return true
  }

  const finalize = data => {
    if (isPlainObject(data) || Array.isArray(data)) {
      if (!isChange(data)) {
        return data
      }
      const copy = getCopy(data)
      Object.keys(copy).forEach(key => {
        copy[key] = finalize(copy[key])
      })
      return copy
    }
    return data
  }

  const proxy = getProxy(baseState)
  fn(proxy)
  return finalize(baseState)
}

const state = {
  info: {
    name: 'yck',
    career: {
      first: {
        name: '111'
      }
    }
  },
  data: [1]
}

const data = produce(state, draftState => {
  draftState.info.age = 26
  draftState.info.career.first.name = '222'
})

console.log(data, state)
console.log(data.data === state.data)
