import React, { FC, useState } from 'react'
import { css } from '@emotion/core'
import { Box, Typography, Snackbar, Slide } from '@material-ui/core'
import SignupForm from './components/SignupForm'

const rootStyle = css`
  width: 600px;
  height: 720px;
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

const loginInfoBlockStyle = css`
  color: #555973;
  text-align: center;
`

const loginMoveTextStyle = css`
  color: #fff;
`

const Signup: FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [alreadyUser, setAlreadyUser] = useState<boolean>(false)

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <Box css={rootStyle}>
      <Typography css={titleStyle}>Signup To Account</Typography>
      <SignupForm onSnackbarOpen={setSnackbarOpen} onAlreadyUser={setAlreadyUser} />
      <Typography css={loginInfoBlockStyle}>
        이미 회원이신가요?{' '}
        <a href="/login" css={loginMoveTextStyle}>로그인 하러가기</a>
      </Typography>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        TransitionComponent={Slide}
        message={alreadyUser ? <span style={{ color: '#F9446C' }}>이미 가입된 유저입니다.</span> : <span>회원가입 성공!</span>}
        key='slide'
      />
    </Box>
  )
}

export default Signup