import React, { FC, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import useSWR from 'swr'
import fetcher from 'utils/fetch'
import { Box, Button, Dialog } from '@material-ui/core'

interface InviteChatspaceModalProps {
  modalIsOpen: boolean
  onModalIsOpen: (value: boolean) => void
}

const InviteChatspaceModal: FC<InviteChatspaceModalProps> = ({ modalIsOpen, onModalIsOpen }) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>()
  const [newMember, setNewMember] = useState('')
  const { data: userData } = useSWR<any>('/api/users', fetcher);
  const { mutate }: any = useSWR<any[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!newMember || !newMember.trim()) {
      return
    }
    axios
      .post(`/api/workspaces/${workspace}/members`, {
        email: newMember,
      })
      .then((response) => {
        mutate()
        onModalIsOpen(false)
        setNewMember('')
      })
      .catch((error) => {
        console.dir(error)
        // toast.error(error.response?.data, { position: 'bottom-center' })
      })
  }

  const handleCloseModal = () => {
    onModalIsOpen(false)
  }

  const handleChangeNewMember = (e: any) => {
    setNewMember(e.target.value)
  }

  return (
    <Dialog onClose={handleCloseModal} open={modalIsOpen}>
      <form onSubmit={handleSubmit}>
        <Box>
          <span>이메일</span>
          <input value={newMember} type="email" onChange={handleChangeNewMember} />
        </Box>
        <Button type="submit">초대하기</Button>
      </form>
    </Dialog>
  )
}

export default InviteChatspaceModal