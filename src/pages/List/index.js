import React from 'react'
import { observer } from 'mobx-react-lite'
// import { v4 as uuid } from 'uuid'

import { useStore } from '../../hooks'

import './List.scss'

// const defaultItem = {
//   id: uuid(),
//   name: 'iPhone 11',
//   onlineStore: 'amazon',
//   price: 26.56,
//   currency: 'USD',
//   deliveryDate: new Date('01/12/2020'),
//   isReceived: false,
// }

const List = observer(() => {
  const rootStore = useStore()
  console.log(rootStore)
  return (
    <section className="List">
      <h1>List</h1>
    </section>
  )
})

export default List
