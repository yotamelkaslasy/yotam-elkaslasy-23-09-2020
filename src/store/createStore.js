import { v4 as uuid } from 'uuid'

function createStore() {
  return {
    list: new Map(),
    add(item) {
      this.list.set(uuid(), item)
    },
    markReceived(id) {
      this.list.get(id).isReceived = true
    },
    get received() {
      return this.list.filter(item => item.isReceived)
    },
  }
}

export { createStore }
