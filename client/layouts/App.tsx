import React from 'react'
import loadable from '@loadable/component'
import { css } from '@emotion/core'
import { Switch, Route, Redirect } from 'react-router-dom'

const Signup = loadable(() => import('pages/Signup'))

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
        <Redirect exact path="/" to="/signup" />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  )
}

export default App

