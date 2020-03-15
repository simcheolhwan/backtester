import React from 'react'
import numeral from 'numeral'
import { SEED } from '../constants'

const Header = () => (
  <nav className="navbar navbar-dark bg-dark">
    <span className="navbar-brand mb-0 h1">BackTester</span>
    <span className="navbar-text">$ {numeral(SEED).format()}/month</span>
  </nav>
)

export default Header
