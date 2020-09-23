import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
// import { v4 as uuid } from 'uuid'

import { useStore } from '../hooks'

import './Home.scss'

// const defaultItem = {
//   id: uuid(),
//   name: 'iPhone 11',
//   onlineStore: 'amazon',
//   price: 26.56,
//   currency: 'USD',
//   deliveryDate: new Date('01/12/2020'),
//   isReceived: false,
// }

const Home = observer(() => {
  const rootStore = useStore()

  return (
    <section className="Home">
      <h1>Home</h1>
    </section>
  )
})

export default Home
