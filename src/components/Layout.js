import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Layout = () => {
  return (
    <>
    <h1 style= {{textAlign:'center'}}>Admin's Dashboard</h1>
    <main className='App'>
        <Outlet/>
    </main>
    </>
  )
}

export default Layout