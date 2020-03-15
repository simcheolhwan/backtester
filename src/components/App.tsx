import React, { useState } from 'react'
import { createContext } from '../utils'
import Header from './Header'
import History from './aside/History'
import Main from './main/Main'

export const [useApp, AppProvider] = createContext<App>()

const App = () => {
  const init = (): Histories => {
    try {
      const local = localStorage.getItem('histories')
      return local ? JSON.parse(local) : {}
    } catch {
      return {}
    }
  }

  const [histories, setHistories] = useState<Histories>(init)

  const addHistory = (symbol: string, history: HistoryData) => {
    const next = { ...histories, [symbol]: history }
    localStorage.setItem('histories', JSON.stringify(next))
    setHistories(next)
  }

  return (
    <AppProvider value={{ histories, addHistory }}>
      <Header />

      <div className="container-fluid">
        <div className="row">
          <div className="col-9">
            <Main />
          </div>

          <div className="col-3">
            <History />
          </div>
        </div>
      </div>
    </AppProvider>
  )
}

export default App
