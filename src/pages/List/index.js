import React, { useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom'
import * as dateUtils from 'date-fns'

import { STORES } from '../../constants'
import { useStore, useInterval } from '../../hooks'
import Button from '../../components/Button'
import LoadingSpinner from '../../components/LoadingSpinner'
import FetchCurrencyError from '../../components/FetchCurrencyError'
import { AddItemModalButton, AddItemModal } from '../../components/AddItemModal'

import './List.scss'

const List = observer(() => {
  const rootStore = useStore()

  const store = useLocalStore(() => ({
    isModalVisible: false,
    selectedTab: 'items',
    selectTab(tab) {
      store.selectedTab = tab
    },
    openModal() {
      store.isModalVisible = true
    },
    closeModal() {
      store.isModalVisible = false
    },
  }))

  useInterval(
    () => {
      rootStore.fetchCurrency()
    },
    rootStore.currencyInterval || rootStore.defaultCurrencyInterval,
    true,
    [rootStore.currencyInterval]
  )

  useEffect(() => {
    rootStore.calcAggregatedListSum('amazon')
    rootStore.calcAggregatedListSum('ebay')
  })

  const isListRoute = useLocation().pathname === '/list'
  const isItemsList = store.selectedTab === 'items'
  const isStoresList = store.selectedTab === 'stores'

  const onIntervalChange = event => {
    rootStore.onIntervalChange(parseInt(event.target.value))
  }
  return (
    <section className="List">
      <header className="List__Header">
        <ul>
          <li
            onClick={() => store.selectTab('items')}
            className={`${isItemsList ? 'selected' : ''}`}>
            Bought items
          </li>
          <li
            onClick={() => store.selectTab('stores')}
            className={`${isStoresList ? 'selected' : ''}`}>
            Stores list
          </li>
        </ul>
      </header>

      {isItemsList && (
        <section className="BoughtItemList">
          <div className="HeaderRow">
            <div className="Col">#</div>
            <div className="Col">Item Name</div>
            <div className="Col">Online Store</div>
            <div className="Col">Price (USD)</div>
            <div className="Col" style={{ position: 'relative' }}>
              Price (ILS){' '}
              <LoadingSpinner isLoading={rootStore.data.fetchCurrencyLoading} />
            </div>
            <div className="Col text-bold">Est. Delivery Date</div>
            <div className="Col">Action</div>
          </div>

          <div className="List__Interval">
            <label htmlFor="intervalInput" className="List__Interval-label">
              Interval in Milliseconds
            </label>
            <input
              id="intervalInput"
              className="List__Interval-input"
              type="number"
              name="currencyInterval"
              min="100"
              defaultValue={rootStore.defaultCurrencyInterval}
              onChange={onIntervalChange}
              placeholder="Number of milliseconds"
            />
            Interval Selected:{' '}
            {rootStore.currencyInterval
              ? rootStore.currencyInterval
              : rootStore.defaultCurrencyInterval}
            ms
          </div>

          {rootStore.data.list.size === 0 && (
            <div
              style={{
                position: 'absolute',
                top: ' 50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}>
              No items : ( <br /> Please add items to the cart via the add
              button below.
            </div>
          )}

          {Array.from(rootStore.data.list.entries())
            .sort(([, itemA], [, itemB]) => {
              return dateUtils.compareAsc(
                new Date(itemA.deliveryDate),
                new Date(itemB.deliveryDate)
              )
            })
            .map(([id, value], index) => {
              return (
                <div
                  key={id}
                  className="Row"
                  style={{ display: value.isReceived ? 'none' : 'flex' }}>
                  <div className="Col">{index}</div>
                  <div className="Col">{value.name}</div>
                  <div className="Col">{value.onlineStore}</div>
                  <div className="Col">${value.price}</div>
                  <div className="Col">
                    ₪
                    {(value.price * rootStore.data.currency.rates.ILS).toFixed(
                      2
                    )}
                  </div>
                  <div className="Col">{value.deliveryDate}</div>
                  <div className="Col">
                    <Button
                      title="Mark Received"
                      primary
                      onClick={() => rootStore.markReceived(id)}
                      className="MarkReceivedButton"
                    />
                  </div>
                </div>
              )
            })}
        </section>
      )}

      {isStoresList && (
        <section className="ReceivedItems">
          <div className="HeaderRow">
            <div className="Col">#</div>
            <div className="Col">Store Name</div>
            <div className="Col">Sum</div>
          </div>

          {Object.entries(STORES).map(([key, value], index) => {
            return (
              <div key={key} className="Row">
                <div className="Col">{index}</div>
                <div className="Col">{key}</div>
                <div className="Col">${rootStore.data.listSum[key]}</div>
              </div>
            )
          })}
        </section>
      )}

      <AddItemModalButton
        visible={!store.isModalVisible && isListRoute}
        onclick={() => store.openModal()}
      />
      <AddItemModal
        visible={store.isModalVisible}
        closeModalHandler={store.closeModal}
      />

      <FetchCurrencyError />
    </section>
  )
})

export default List
