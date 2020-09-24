import { v4 as uuid } from 'uuid'

function createStore() {
  return {
    data: {
      list: new Map(),
      sum: {
        amazon: 0,
        ebay: 0,
      },
    },
    saveItem(item) {
      this.data.list.set(uuid(), item)
      console.log(this.data.list)
    },

    calcAggregatedSum(store) {
      this.data.sum[store] = Array.from(this.data.list.entries())
        .filter(([, item]) => item.onlineStore === store)
        .reduce((accumulator, [, value]) => {
          return accumulator + value.price
        }, 0)
    },
    markReceived(id) {
      this.data.list.get(id).isReceived = true
    },
    get receivedItems() {
      return Array.from(this.data.list.entries()).filter(([, item]) => {
        return item.isReceived
      })
    },
  }
}

export { createStore }
