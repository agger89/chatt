import React, { FC, useState } from 'react'
import { useParams } from 'react-router'
import useSWR from 'swr'
import axios from 'axios'
import { Dialog, Box, Button, Typography, Snackbar, Slide } from '@material-ui/core'
import fetcher from 'utils/fetch'

interface InviteGroupChatModalProps {
  modalIsOpen: boolean
  onModalIsOpen: (value: boolean) => void
}

const InviteGroupChatModal: FC<InviteGroupChatModalProps> = ({ modalIsOpen, onModalIsOpen }) => {
  const { workspace, channel } = useParams<{ workspace: string, channel: string }>()
  const [newMember, setNewMember] = useState('')

  const { data: userData } = useSWR<any>('/api/users', fetcher)
  const { revalidate: revalidateMembers }: any = useSWR<any[]>(
    userData && channel ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  )


  const handleSubmit = (e: any) => {
    e.preventDefault()

    console.log('workspace', workspace)
    console.log('newMember', newMember)
    console.log('channel', channel)

    if (!newMember || !newMember.trim()) {
      return
    }

    axios
      .post(`/api/workspaces/${workspace}/channels/${channel}/members`, {
        email: newMember,
      })
      .then(() => {
        console.log('성공')
        revalidateMembers()
        onModalIsOpen(false)
        // setNewMember('')
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
        <Box id="member-label">
          <span>채널 멤버 초대</span>
          <input value={newMember} onChange={handleChangeNewMember} />
        </Box>
        <Button type="submit">초대하기</Button>
      </form>
    </Dialog>
  )
}

export default InviteGroupChatModal