import React from 'react'
import Router from './Router'
import { ContextProvider } from './components/Context'
function App() {
  return (
    <>
    <ContextProvider>
      <Router />
    </ContextProvider>
    </>
  )
}

export default App
