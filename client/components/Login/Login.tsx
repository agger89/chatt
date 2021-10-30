import React, { FC, useState } from 'react'
import useSWR from 'swr'
import { Redirect } from 'react-router-dom'
import { css } from '@emotion/core'
import { Box, Typography, Snackbar, Slide } from '@material-ui/core'
import fetcher from 'utils/fetch'
import LoginForm from './components/LoginForm'

const rootStyle = css`
  width: 600px;
  height: 660px;
  padding: 80px 40px; 
  background-color: #282C44;
  border-radius: 10px;
`

const titleStyle = css`
  font-size: 24px;
  font-weight: 800;
  font-family: system-ui;
  color: #fff;
  text-align: center;
  letter-spacing: 1.25;
`

const signupInfoBlockStyle = css`
  color: #555973;
  text-align: center;
`

const signupMoveTextStyle = css`
  color: #fff;
`

const Login: FC = () => {
  const { data: userData, error, mutate } = useSWR('/api/users', fetcher)
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)

  if (!error && userData) {
    return <Redirect to="/workspace/sleact" />
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <Box css={rootStyle}>
      <Typography css={titleStyle}>Login To Account</Typography>
      <LoginForm mutateUser={mutate} onSnackbarOpen={setSnackbarOpen} />
      <Typography css={signupInfoBlockStyle}>
        아직 회원이 아니신가요?{' '}
        <a href="/signup" css={signupMoveTextStyle}>회원가입 하러가기</a>
      </Typography>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={1000}
        TransitionComponent={Slide}
        message={<span>로그인 성공!</span>}
        key='slide'
      />
    </Box>
  )
}

export default Login