import React from 'react'

const Orders = ({orders}) => {
  return (
    <>
    <h1>Orders</h1>
      {orders.map(order =>{
          return <li key={order.id}>{order.status} </li>
      })}
    </>
  )
}

export default Orders