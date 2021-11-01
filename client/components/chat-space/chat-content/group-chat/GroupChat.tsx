import React, { FC, useRef, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { useForm } from 'react-hook-form'
import useSocket from 'hooks/useSocket'
import { css } from '@emotion/core'
import { Box, Typography, Button } from '@material-ui/core'
import PersonAddIcon from '@mui/icons-material/PersonAddAlt'
import fetcher from 'utils/fetch'
import ChatHeader from '../ChatHeader'
import ChatMessage from '../chat-message/ChatMessage'
import ChatInput from '../input/ChatInput'
import InviteGroupChatModal from './InviteGroupChatModal'

const rootStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 460px);
`

const headerTitleStyle = css`
  margin-right: 4px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`

const headerSubTitleStyle = css`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`

const buttonStyle = css`
  margin-left: auto !important;
  color: #fff !important;
`

const GroupChat = () => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>()
  const { data: me } = useSWR('/api/users', fetcher)
  const { data: channelData } = useSWR<any>(`/api/workspaces/${workspace}/channels/${channel}`, fetcher)
  const { data: chats, mutate: mutateChat, revalidate, setSize }: any = useSWRInfinite<any>(
    (index: number) => `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=20&page=${index + 1}`,
    fetcher,
  )
  const { data: members } = useSWR<any[]>(
    me ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  )

  console.log('chats', chats)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const scrollbarRef = useRef<any>(null)

  const { handleSubmit, control, formState: { errors }, getValues, clearErrors, setError, reset } = useForm()

  const handleChatSubmit = () => {
    const { chat } = getValues()
    clearErrors(['chat'])
    // if (chat?.trim() && chatData && channelData) {
    //   const savedChat = chat
    //   mutateChat((prevChatData) => {
    //     prevChatData?.[0].unshift({
    //       id: (chatData[0][0]?.id || 0) + 1,
    //       content: savedChat,
    //       UserId: myData.id,
    //       User: myData,
    //       ChannelId: channelData.id,
    //       Channel: channelData,
    //       createdAt: new Date(),
    //     })
    //     return prevChatData
    //   }, false)
    //     .then(() => {
    //       reset({ chat: '' })
    //       scrollbarRef.current?.scrollToBottom()
    //     })
    //   axios
    //     .post(`/api/workspaces/${workspace}/channels/${channel}/chats`, {
    //       content: chat,
    //     })
    //     .then(() => {
    //       revalidate()
    //     })
    //     .catch(console.error)
    // }

    axios
      .post(`/api/workspaces/${workspace}/channels/${channel}/chats`, {
        content: chat,
      })
      // .then(() => {
      //   revalidate()
      // })
      .catch(console.error)
    reset({ value: '' })
  }

  const handleOpenModal = () => {
    setModalIsOpen(true)
  }

  const handleClickModalOpen = () => {
    setModalIsOpen(true)
  }

  return (
    <div css={rootStyle}>
      <ChatHeader>
        <span css={headerTitleStyle}>단톡방</span>
        <span css={headerSubTitleStyle}>({members?.length}명)</span>
        <Button
          onClick={handleClickModalOpen}
          css={buttonStyle}
        >
          <PersonAddIcon />
        </Button>
      </ChatHeader>
      <ChatMessage
        scrollbarRef={scrollbarRef}
        setSize={setSize}
        chats={chats}
      />
      <ChatInput onSubmit={handleSubmit(handleChatSubmit)} control={control} />
      <InviteGroupChatModal
        modalIsOpen={modalIsOpen}
        onModalIsOpen={setModalIsOpen}
      />
    </div>
  )
}

export default GroupChat