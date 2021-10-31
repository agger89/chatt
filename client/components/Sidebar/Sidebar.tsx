import React, { FC } from 'react'
import { css } from '@emotion/core'
import { Box, Dialog, Button } from '@material-ui/core'
import Chatspace from './components/Chatspace'
import Profile from './components/Profile'

const rootStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #2E334D;
  padding: 0 10px;
`

interface SidebarProps {
  user: any
  mutateUser: () => void
}

const Sidebar: FC<SidebarProps> = ({ user, mutateUser }) => {

  return (
    <Box css={rootStyle}>
      <div />
      <Chatspace user={user} />
      <Profile mutateUser={mutateUser} user={user} />
    </Box>
  )
}

export default Sidebar