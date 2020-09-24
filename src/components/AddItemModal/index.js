import React, { createRef } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'

import { STORES } from '../../constants'
import { useStore } from '../../hooks'
import Button from '../../components/Button'

import './AddItemModal.scss'

const defaultItem = {
  name: '',
  onlineStore: Object.keys(STORES)[0],
  price: 0,
  deliveryDate: '',
  isReceived: false,
}

const AddItemModal = observer(({ visible, closeModalHandler }) => {
  const formRef = createRef()

  const rootStore = useStore()

  const store = useLocalStore(() => ({
    newItem: {
      ...defaultItem,
    },
    isFormValid: false,
  }))

  const onValueChange = event => {
    store.newItem[event.target.name] =
      event.target.name === 'price'
        ? parseFloat(event.target.value)
        : event.target.value
  }

  const onOnlineStoreChange = event => {
    store.newItem.onlineStore = event.target.value
  }

  return visible ? (
    <>
      <div className="AddItemModal-Backdrop" onClick={closeModalHandler}></div>
      <div className="AddItemModal">
        <div className="AddItemModal__Title">Add Item</div>
        <div className="AddItemModal__Description">
          Fill out the form to add item to list.
        </div>
        <form ref={formRef} className="AddItemModal__FormWrap">
          <div className="AddItemModal__FormWrap__FormItem">
            <label
              className="AddItemModal__FormWrap__FormItem-label"
              htmlFor="itemName">
              Item Name
            </label>
            <input
              id="itemName"
              type="text"
              name="name"
              value={store.newItem.name}
              onChange={onValueChange}
              className="AddItemModal__FormWrap__FormItem-input"
              required
            />
          </div>
          <div className="AddItemModal__FormWrap__FormItem">
            <label
              className="AddItemModal__FormWrap__FormItem-label"
              htmlFor="onlineStore">
              Select a Store
            </label>
            <select
              id="onlineStore"
              name="onlineStore"
              value={store.newItem.onlineStore}
              className="AddItemModal__FormWrap__FormItem-select"
              onChange={onOnlineStoreChange}>
              {Object.entries(STORES).map(([key, value]) => {
                return (
                  <option key={`${key}-${value}`} value={key}>
                    {key}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="AddItemModal__FormWrap__FormItem">
            <label
              className="AddItemModal__FormWrap__FormItem-label"
              htmlFor="price">
              Price (USD)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={store.newItem.price}
              onChange={onValueChange}
              placeholder="Price (USD)"
              className="AddItemModal__FormWrap__FormItem-input"
              required
            />
          </div>
          <div className="AddItemModal__FormWrap__FormItem">
            <label
              className="AddItemModal__FormWrap__FormItem-label"
              htmlFor="deliveryDate">
              Est. Delivery Date
            </label>
            <input
              id="deliveryDate"
              type="date"
              name="deliveryDate"
              value={store.newItem.deliveryDate}
              onChange={onValueChange}
              placeholder="EST. Delivery Date"
              className="AddItemModal__FormWrap__FormItem-input"
              required
            />
          </div>
        </form>
        <div className="AddItemModal__ActionsWrap">
          <Button
            primary
            title="Save"
            className="AddItemModal__ActionsWrap__SaveButton"
            onClick={() => {
              if (!formRef.current.checkValidity()) {
                formRef.current.reportValidity()
                return
              }
              rootStore.saveItem(store.newItem)
              store.newItem = { ...defaultItem }
              closeModalHandler()
            }}
          />
          <Button
            title="Cancel"
            onClick={() => {
              closeModalHandler()
            }}
          />
        </div>
      </div>
    </>
  ) : null
})

const AddItemModalButton = ({ onclick, visible }) => {
  return visible ? (
    <Button
      primary
      title="Add Item"
      className="AddItemModalButton"
      onClick={onclick}
    />
  ) : null
}

export { AddItemModal, AddItemModalButton }
