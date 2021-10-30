import React, { FC, useState } from 'react'
import axios from 'axios'
import { css } from '@emotion/core'
import { Box, Dialog, Button } from '@material-ui/core'
import ProfileImage from 'components/ProfileImage'

const rootStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 90px;
  height: 100%;
  background-color: #2E334D;
  border-radius: 20px;
`

const profileStyle = css`
  display: inline-block;
  margin-bottom: 40px;
  cursor: pointer;
`

const dialogStyle = css`
  padding: 60px 120px;
  background-color: #2E334D;
  text-align: center;
`

const dialogNicknameStyle = css`
  display: inline-block;
  margin-top: 12px;
  color: #fff;
`

const logoutTextStyle = css`
  padding: 16px 0;
  background-color: #282C44;
  border: 0;
  color: #fff;
  cursor: pointer;
`


interface ProfileProps {
  mutateUser: () => void
  user: any
}

const Profile: FC<ProfileProps> = ({ mutateUser, user }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const handleDialogOpen = () => {
    setDialogIsOpen(true)
  }

  const handleDialogClose = () => {
    setDialogIsOpen(false)
  }

  const handleLogOut = () => {
    axios
      .post('/api/users/logout')
      .then(() => {
        mutateUser()
      })
      .catch((error) => {
        console.dir(error)
        // toast.error(error.response?.data, { position: 'bottom-center' })
      })
  }

  return (
    <Box css={rootStyle}>
      <Box css={profileStyle} onClick={handleDialogOpen}>
        <ProfileImage user={{
          email: user?.email, nickname: user?.nickname,
        }} size="36px" />
      </Box>
      <Dialog onClose={handleDialogClose} open={dialogIsOpen}>
        <Box css={dialogStyle}>
          <ProfileImage user={{
            email: user?.email, nickname: user?.nickname,
          }} size="52px" />
          <Box>
            <span css={dialogNicknameStyle} id="profile-name">{user?.nickname}</span>
          </Box>
        </Box>
        <Button css={logoutTextStyle} onClick={handleLogOut}>로그아웃</Button>
      </Dialog>
    </Box>
  )
}

export default Profile