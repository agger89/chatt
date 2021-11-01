import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Redirect, Route, Switch } from 'react-router-dom'
import useSWR from 'swr'
import fetcher from 'utils/fetch'
import { css } from '@emotion/core'
import { Box } from '@material-ui/core'
import ChatList from 'components/ChatList/ChatList'
import GroupChat from 'components/GroupChat/GroupChat'
import DirectChat from 'components/DirectChat/DirectChat'
import useSocket from 'hooks/useSocket'
import Sidebar from 'components/Sidebar/Sidebar'

const rootStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #282C44;
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
    return <Redirect to="/login" />
  }

  return (
    <Box css={rootStyle}>
      <Sidebar user={user} mutateUser={mutate} />
      <ChatList user={user} />
      <Switch>
        <Route path="/workspace/:workspace/channel/:channel" component={GroupChat} />
        <Route path="/workspace/:workspace/dm/:id" component={DirectChat} />
      </Switch>
    </Box>
  )
}

export default Chatspace