import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Redirect, Route, Switch } from 'react-router-dom'
import useSWR from 'swr'
import fetcher from 'utils/fetch'
import { css } from '@emotion/core'
import { Box } from '@material-ui/core'
import { ChatUserList } from 'components/ChatUserList'
import ChatMessage from 'components/ChatMessage/ChatMessage'
import useSocket from 'hooks/useSocket'
import Sidebar from 'components/Sidebar/Sidebar'

const rootStyle = css`
  width: 1400px;
  height: 880px;
  display: flex;
  background-color: #282C44;
  border-radius: 20px;
`

const Chatspace = () => {
  const workspace = 'sleact'
  const [socket, disconnectSocket] = useSocket(workspace)
  const { data: user, mutate } = useSWR<any>('/api/users', fetcher)
  const { data: channelData } = useSWR<any[]>(user ? `/api/workspaces/${workspace}/channels` : null, fetcher)

  useEffect(() => {
    return () => {
      disconnectSocket()
    }
  }, [disconnectSocket, workspace])

  useEffect(() => {
    if (channelData && user) {
      socket?.emit('login', { id: user?.id, channels: channelData.map((v) => v.id) })
    }
  }, [socket, user, channelData])

  if (user === false) {
    return <Redirect to="/login" />;
  }

  return (
    <Box css={rootStyle}>
      <Sidebar user={user} mutateUser={mutate} />
      <ChatUserList user={user} />
      <Route path="/workspace/:workspace/dm/:id" component={ChatMessage} />
    </Box>
  )
}

export default Chatspace