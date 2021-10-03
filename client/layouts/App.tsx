import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Signup from 'pages/Signup'

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/signup" />
      <Route path="/signup" component={Signup} />
    </Switch>
  )
}

export default App
