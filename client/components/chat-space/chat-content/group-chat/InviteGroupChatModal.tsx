import React, { FC, useState } from 'react'
import { useParams } from 'react-router'
import useSWR from 'swr'
import axios from 'axios'
import { Dialog, Box, Button, Typography, Snackbar, Slide } from '@material-ui/core'
import fetcher from 'utils/fetch'
import ModalForm from 'components/chat-space/ModalForm'

interface InviteGroupChatModalProps {
  modalIsOpen: boolean
  onModalIsOpen: (value: boolean) => void
}

const InviteGroupChatModal: FC<InviteGroupChatModalProps> = ({ modalIsOpen, onModalIsOpen }) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>()
  const [newMember, setNewMember] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (!newMember || !newMember.trim()) {
      return
    }

    axios
      .post(`/api/workspaces/${workspace}/members`, {
        email: newMember,
      })
      .then(() => {
        onModalIsOpen(false)
        setSnackbarOpen(true)
      })
      .catch((error) => {
        console.dir(error)
        // toast.error(error.response?.data, { position: 'bottom-center' })
      })
  }

  const handleChangeNewMember = (e: any) => {
    setNewMember(e.target.value)
  }

  return (
    <ModalForm
      modalIsOpen={modalIsOpen}
      onModalIsOpen={onModalIsOpen}
      onSubmit={handleSubmit}
      snackbarOpen={snackbarOpen}
      onSnackbarOpen={setSnackbarOpen}
      snackbarMessage="멤버 초대 성공!"
    >
      <Box>
        <span>이메일</span>
        <input value={newMember} type="email" onChange={handleChangeNewMember} />
      </Box>
      <Button type="submit">초대하기</Button>
    </ModalForm>
  )
}

export default InviteGroupChatModal