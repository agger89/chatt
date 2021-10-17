import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import useSWR from 'swr'
import fetcher from 'utils/fetch'
import { css } from '@emotion/core'
import { Dialog } from '@material-ui/core'
import gravatar from 'gravatar'
import { ChatUserList } from 'components/ChatUserList'
import { DirectMessage } from 'components/DirectMessage'
import useSocket from 'hooks/useSocket'

const rootStyle = css`
  width: 1400px;
  height: 880px;
  display: flex;
  background-color: #282C44;
  border-radius: 20px;
`

const profileBarStyle = css`
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

const profileImageStyle = css`
  border-radius: 50%;
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

const Chatspace = () => {
  const workspace = 'sleact'
  const [socket, disconnectSocket] = useSocket(workspace);
  const { data: user, mutate } = useSWR<any>('/api/users', fetcher)
  const { data: channelData } = useSWR<any[]>(user ? `/api/workspaces/${workspace}/channels` : null, fetcher);
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
    <div css={rootStyle}>
      <div css={profileBarStyle}>
        <span css={profileStyle} onClick={handleDialogOpen}>
          <img css={profileImageStyle} src={gravatar.url(user?.email, { s: '36px', d: 'retro' })} alt={user?.nickname} />
        </span>
        <Dialog onClose={handleDialogClose} open={dialogIsOpen}>
          <div css={dialogStyle}>
            <img css={profileImageStyle} src={gravatar.url(user?.email, { s: '52px', d: 'retro' })} alt={user?.nickname} />
            <div>
              <span css={dialogNicknameStyle} id="profile-name">{user?.nickname}</span>
            </div>
          </div>
          <button css={logoutTextStyle} onClick={handleLogOut}>로그아웃</button>
        </Dialog>
      </div>
      <ChatUserList user={user} />
      <Route path="/workspace/:workspace/dm/:id" component={DirectMessage} />
    </div>
  )
}

export default Chatspace