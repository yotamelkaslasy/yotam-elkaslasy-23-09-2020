import { v4 as uuid } from 'uuid'
import * as dateUtils from 'date-fns'

import { CURRENCY_API_URL } from '../constants'

function createStore() {
  return {
    data: {
      fetchCurrencyLoading: false,
      fetchCurrencyError: false,
      fetchCurrencyErrorMessage: 'Server response error',
      currency: null,
      list: new Map(),
      listSum: {
        amazon: 0,
        ebay: 0,
      },
      receivedSum: {
        amazon: 0,
        ebay: 0,
      },
    },
    currencyInterval: null,
    defaultCurrencyInterval: 10000,
    saveItem(item) {
      this.data.list.set(uuid(), item)
    },

    calcAggregatedListSum(store) {
      this.data.listSum[store] = Array.from(this.data.list.entries())
        .filter(([, item]) => {
          return !item.isReceived
        })
        .filter(([, item]) => item.onlineStore === store)
        .reduce((accumulator, [, value]) => {
          return accumulator + value.price
        }, 0)
    },
    calcAggregatedReceivedSum(store) {
      this.data.receivedSum[store] = this.receivedItems
        .filter(([, item]) => item.onlineStore === store)
        .reduce((accumulator, [, value]) => {
          return accumulator + value.price
        }, 0)
    },
    markReceived(id) {
      this.data.list.get(id).isReceived = true
    },
    onIntervalChange(interval) {
      this.currencyInterval = interval
    },
    get receivedItems() {
      return Array.from(this.data.list.entries())
        .sort(([, itemA], [, itemB]) => {
          return dateUtils.compareAsc(
            new Date(itemA.deliveryDate),
            new Date(itemB.deliveryDate)
          )
        })
        .filter(([, item]) => {
          return item.isReceived
        })
    },
    async fetchCurrency() {
      this.data.fetchCurrencyLoading = true
      this.data.currency = await fetch(CURRENCY_API_URL).then(res => {
        if (res.status >= 400) {
          this.data.fetchCurrencyError = true
          this.data.fetchCurrencyLoading = false
          this.fetchCurrencyErrorMessage =
            res.status + ' ' + res.statusText || 'Server response error'
          throw new Error('Server response error.')
        }
        return res.json()
      })
      this.data.fetchCurrencyLoading = false
    },
  }
}

export { createStore }
