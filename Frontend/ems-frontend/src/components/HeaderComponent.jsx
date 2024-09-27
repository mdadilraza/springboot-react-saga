import React from 'react'

const HeaderComponent = () => {
  return (
    <>
    <header style={{position: 'fixed', top: 0, width: '100%'}}>
        <nav className='navbar navbar-dark bg-dark'>
        <a className="navbar-brand" href="#">Employee Management System</a>

        </nav>
    </header>
    </>
  )
}

export default HeaderComponent