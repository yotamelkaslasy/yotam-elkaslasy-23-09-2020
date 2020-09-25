import React, { useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { STORES } from '../../constants'
import { useStore } from '../../hooks'

import './Received.scss'

const Received = observer(() => {
  const rootStore = useStore()

  const store = useLocalStore(() => ({
    isModalVisible: false,
    selectedTab: 'items',
    selectTab(tab) {
      store.selectedTab = tab
    },
  }))

  useEffect(() => {
    rootStore.calcAggregatedReceivedSum('amazon')
    rootStore.calcAggregatedReceivedSum('ebay')
  })

  const isItemsList = store.selectedTab === 'items'
  const isStoresList = store.selectedTab === 'stores'

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
            <div className="Col text-bold">Est. Delivery Date</div>
          </div>

          {rootStore.receivedItems.length === 0 && (
            <div
              style={{
                position: 'absolute',
                top: ' 50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}>
              No items : ( <br /> Please mark items as received in the items
              list.
            </div>
          )}

          {rootStore.receivedItems.map(([id, value], index) => {
            return (
              <div
                key={id}
                className="Row"
                style={{ display: value.isReceived ? 'flex' : 'none' }}>
                <div className="Col">{index}</div>
                <div className="Col">{value.name}</div>
                <div className="Col">{value.onlineStore}</div>
                <div className="Col">${value.price}</div>
                <div className="Col">{value.deliveryDate}</div>
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

          {Object.entries(STORES).map(([key], index) => {
            return (
              <div key={key} className="Row">
                <div className="Col">{index}</div>
                <div className="Col">{key}</div>
                <div className="Col">${rootStore.data.receivedSum[key]}</div>
              </div>
            )
          })}
        </section>
      )}
    </section>
  )
})

export default Received
