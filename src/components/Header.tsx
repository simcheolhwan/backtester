import React from 'react'
import numeral from 'numeral'
import { SEED } from '../constants'

const Header = ({ onToggle }: { onToggle: () => void }) => (
  <nav className="navbar navbar-dark bg-dark">
    <span className="navbar-brand mb-0 h1">BackTester</span>

    <span className="navbar-text" onClick={onToggle}>
      $ {numeral(SEED).format()}/month
    </span>
  </nav>
)

export default Header
