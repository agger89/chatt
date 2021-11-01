import React, { FC } from 'react'
import { css } from '@emotion/core'
import { Box, Dialog, Button } from '@material-ui/core'
import ChatspaceList from './components/chat-space-list/ChatspaceList'
import Profile from './components/SidebarProfile'

const rootStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90px;
  height: 100%;
  background-color: #2E334D;
`

interface SidebarProps {
  user: any
  mutateUser: () => void
}

const Sidebar: FC<SidebarProps> = ({ user, mutateUser }) => {

  return (
    <Box css={rootStyle}>
      <div />
      <ChatspaceList user={user} />
      <Profile mutateUser={mutateUser} user={user} />
    </Box>
  )
}

export default Sidebar