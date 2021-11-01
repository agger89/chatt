import React, { FC } from 'react'
import { css } from '@emotion/core'
import { Box } from '@material-ui/core'
import GroupMessageList from './components/GroupMessageList'
import DirectMessageList from './components/DirectMessageList'

const rootStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 370px;
  padding: 30px 0;
  border-right: 2px solid #2E334D;
`
interface ChannelListProps {
  user: any
}

const ChannelList: FC<ChannelListProps> = ({ user }) => {

  return (
    <Box css={rootStyle}>
      <GroupMessageList />
      <DirectMessageList user={user} />
    </Box>
  )
}

export default ChannelList