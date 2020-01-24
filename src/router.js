import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

// Components
import Start from './components/pages/start'
import BingoCards from './components/pages/cards'
import Congrats from './components/pages/congrats'

const Router = () => (
  <BrowserRouter>
    <Route path="/" component={Start} exact={true} />
    <Route path="/cards" component={BingoCards} exact={true} />
    <Route path="/congrats" component={Congrats} exact={true} />
  </BrowserRouter>
)

export default Router
