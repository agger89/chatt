import React, { FC } from 'react'
import { css } from '@emotion/core'
import { Box } from '@material-ui/core'
import ChannelList from './components/ChannelList'
import DirectMessageList from './components/DirectMessageList'

const rootStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 370px;
  padding: 30px 0;
  border-right: 2px solid #2E334D;
`

interface ChatUserListProps {
  user: any
}

const ChatUserList: FC<ChatUserListProps> = ({ user }) => {

  return (
    <Box css={rootStyle}>
      <ChannelList />
      <DirectMessageList user={user} />
    </Box>
  )
}

export default ChatUserList