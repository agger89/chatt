import React from 'react'
import loadable from '@loadable/component'
import { css } from '@emotion/core'
import { Switch, Route, Redirect } from 'react-router-dom'

const Signup = loadable(() => import('pages/Signup'))
const Login = loadable(() => import('pages/Login'))
const Chatspace = loadable(() => import('layouts/Chatspace'))

const signupBlock = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const App = () => {
  return (
    <div css={signupBlock}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/chatspace" component={Chatspace} />
      </Switch>
    </div>
  )
}

export default App

