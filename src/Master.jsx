
import React from 'react'
import Header from './Component/Header'
import Footer from './Component/Footer'

const Master = (props) => {
  return (
    <div>
        <Header />
        <props.Comp></props.Comp>
        <Footer />
    </div>
  )
}

export default Master