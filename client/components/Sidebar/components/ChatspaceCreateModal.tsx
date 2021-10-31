import React, { FC, useState } from 'react'
import axios from 'axios'
import { css } from '@emotion/core'
import { Dialog, Box, Button, Typography, Snackbar, Slide } from '@material-ui/core'

const formStyle = css`
  padding: 20px 80px;
`

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
  const [workspaceName, setWorkspaceName] = useState('')
  const [workspaceUrl, setWorkspaceUrl] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)

  const handleCreateWorkspace = (e: any) => {
    e.preventDefault()

    if (!workspaceName || !workspaceName.trim()) {
      return
    }

    if (!workspaceUrl || !workspaceUrl.trim()) {
      return
    }

    axios
      .post('/api/workspaces', {
        workspace: workspaceName,
        url: workspaceUrl,
      })
      .then(() => {
        onModalIsOpen(false)
        setSnackbarOpen(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleCloseModal = () => {
    onModalIsOpen(false)
  }

  const handleChangeWorkspaceName = (e: any) => {
    setWorkspaceName(e.target.value)
  }

  const handleChangeWorkspaceUrl = (e: any) => {
    setWorkspaceUrl(e.target.value)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <>
      <Dialog onClose={handleCloseModal} open={modalIsOpen}>
        <form onSubmit={handleCreateWorkspace} css={formStyle}>
          <Box css={inputGroupStyle}>
            <Typography>워크스페이스 이름</Typography>
            <input value={workspaceName} onChange={handleChangeWorkspaceName} css={inputStyle} />
          </Box>
          <Box css={inputGroupStyle}>
            <Typography>워크스페이스 url</Typography>
            <input value={workspaceUrl} onChange={handleChangeWorkspaceUrl} css={inputStyle} />
          </Box>
          <Button type="submit" css={buttonStyle}>생성하기</Button>
        </form>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={1000}
        TransitionComponent={Slide}
        message={<span>채팅스페이스 생성 성공!</span>}
        key='slide'
      />
    </>
  )
}

export default ChatspaceCreateModal