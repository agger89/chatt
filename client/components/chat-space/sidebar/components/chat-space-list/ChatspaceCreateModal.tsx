import React, { FC, useState } from 'react'
import axios from 'axios'
import { css } from '@emotion/core'
import { Box, Button, Typography } from '@material-ui/core'
import ModalForm from 'components/chat-space/ModalForm'

const inputGroupStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
`

const inputStyle = css`
  padding: 6px;
`

const buttonStyle = css`
  width: 100%;
  border: 1px solid #000 !important;
`

interface ChatspaceCreateModalProps {
  modalIsOpen: boolean
  onModalIsOpen: (value: boolean) => void
}

const ChatspaceCreateModal: FC<ChatspaceCreateModalProps> = ({ modalIsOpen, onModalIsOpen }) => {
  const [channelName, setChannelName] = useState('')
  const [channelUrl, setChannelUrl] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (!channelName || !channelName.trim()) {
      return
    }

    if (!channelUrl || !channelUrl.trim()) {
      return
    }

    axios
      .post('/api/workspaces', {
        workspace: channelName,
        url: channelUrl,
      })
      .then(() => {
        onModalIsOpen(false)
        setSnackbarOpen(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleChangeChannelName = (e: any) => {
    setChannelName(e.target.value)
  }

  const handleChangeChannelUrl = (e: any) => {
    setChannelUrl(e.target.value)
  }

  return (
    <ModalForm
      modalIsOpen={modalIsOpen}
      onModalIsOpen={onModalIsOpen}
      onSubmit={handleSubmit}
      snackbarOpen={snackbarOpen}
      onSnackbarOpen={setSnackbarOpen}
      snackbarMessage="채널 생성 성공!"
    >
      <Box css={inputGroupStyle}>
        <Typography>채널 이름</Typography>
        <input value={channelName} onChange={handleChangeChannelName} css={inputStyle} />
      </Box>
      <Box css={inputGroupStyle}>
        <Typography>채널 url</Typography>
        <input value={channelUrl} onChange={handleChangeChannelUrl} css={inputStyle} />
      </Box>
      <Button type="submit" css={buttonStyle}>생성하기</Button>
    </ModalForm>
  )
}

export default ChatspaceCreateModal