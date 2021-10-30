import React, { FC } from 'react'
import { css } from '@emotion/core'
import { Box } from '@material-ui/core'
import ChatUser from './components/ChatUser'

const rootStyle = css`
  display: flex;
  justify-content: center;
  width: 370px;
  padding: 60px 28px;
  border-right: 2px solid #2E334D;
`
interface ChatUserListProps {
  user: any
}

const ChatUserList: FC<ChatUserListProps> = ({ user }) => {

  return (
    <Box css={rootStyle}>
      <ChatUser user={user} />
    </Box>
  )
}

export default ChatUserList