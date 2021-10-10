import React, { useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import fetcher from 'utils/fetch'
import { Redirect } from 'react-router-dom'
import { css } from '@emotion/core'
import { Dialog } from '@material-ui/core'
import gravatar from 'gravatar'

const rootStyle = css`
  width: 1400px;
  height: 880px;
  background-color: #282C44;
  border-radius: 20px;
`

const profileBarStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 86px;
  height: 100%;
  background-color: #2E334D;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`

const profileStyle = css`
  display: inline-block;
  margin-bottom: 40px;
  cursor: pointer;
`

const profileImageStyle = css`
  border-radius: 50%;
`

const dialogStyle = css`
  padding: 60px 120px;
  background-color: #2E334D;
  text-align: center;
`

const nicknameStyle = css`
  display: inline-block;
  margin-top: 10px;
  color: #fff;
`

const logoutTextStyle = css`
  padding: 10px 0;
  background-color: #282C44;
  border: 0;
  color: #fff;
  cursor: pointer;
`

const Chatspace = () => {
  const { data: userData, mutate } = useSWR<any>('/api/users', fetcher)
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const handleLogOut = () => {
    axios
      .post('/api/users/logout')
      .then(() => {
        mutate()
      })
      .catch((error) => {
        console.dir(error)
        // toast.error(error.response?.data, { position: 'bottom-center' })
      })
  }

  const handleDialogOpen = () => {
    setDialogIsOpen(true)
  }

  const handleDialogClose = () => {
    setDialogIsOpen(false)
  }

  console.log('userData', userData)

  if (userData === false) {
    return <Redirect to="/login" />
  }

  return (
    <div css={rootStyle}>
      <div css={profileBarStyle}>
        <span css={profileStyle} onClick={handleDialogOpen}>
          <img css={profileImageStyle} src={gravatar.url(userData?.email, { s: '36px', d: 'retro' })} alt={userData?.nickname} />
        </span>
        <Dialog onClose={handleDialogClose} open={dialogIsOpen}>
          <div css={dialogStyle}>
            <img css={profileImageStyle} src={gravatar.url(userData?.email, { s: '52px', d: 'retro' })} alt={userData?.nickname} />
            <div>
              <span css={nicknameStyle} id="profile-name">{userData?.nickname}</span>
            </div>
          </div>
          <button css={logoutTextStyle} onClick={handleLogOut}>로그아웃</button>
        </Dialog>
      </div>
    </div>
  )
}

export default Chatspace