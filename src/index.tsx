import { useState } from 'react'

const createTraps = (setValue: React.Dispatch<any>): ProxyHandler<any> => {
  return {
    get(target, key, receiver) {
      if (key === `$`) {
        let newValue: any
        if (Array.isArray(target)) {
          newValue = [...target]
        } else {
          newValue = { ...target }
        }
        return () => setValue(newValue)
      }
      return Reflect.get(target, key, receiver)
    }
  }
}

interface ICommit {
  $: () => void
}

function useProState<T>(target: T): T & ICommit {
  if (typeof target !== 'object') {
    throw Error('useProState can only receive object')
  }
  const [value, setValue] = useState(target)
  const traps = createTraps(setValue)
  return new Proxy<any>(value, traps)
}

export default useProState
