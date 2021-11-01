import React, { FC, useRef, useEffect } from 'react'
import { useParams } from 'react-router'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite';
import axios from 'axios'
import gravatar from 'gravatar'
import { useForm } from 'react-hook-form'
import { css } from '@emotion/core'
import useSocket from 'hooks/useSocket'
import fetcher from 'utils/fetch'
import ChatHeader from '../ChatHeader'
import ChatInput from '../input/ChatInput'
import ChatList from '../ChatList'
import { Typography } from '@material-ui/core';

const rootStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 460px);
`

const headerImageStyle = css`
  margin-right: 4px;
  border-radius: 50%;
`

const headerSubTitleStyle = css`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
`


export const PAGE_SIZE = 20
const DirectChat: FC = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>()
  const [socket] = useSocket(workspace)
  const { data: myData } = useSWR<any>('/api/users', fetcher)
  const { data: user } = useSWR<any>(`/api/workspaces/${workspace}/users/${id}`, fetcher)
  const {
    data: chatData,
    mutate: mutateChat,
    revalidate,
    setSize,
  }: any = useSWRInfinite<any[]>(
    (index: number) => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=${PAGE_SIZE}&page=${index + 1}`,
    fetcher
  )

  const scrollbarRef = useRef<any>(null)

  useEffect(() => {
    if (chatData) {
      setTimeout(() => {
        scrollbarRef.current?.scrollToBottom()
      })
    }
  }, [chatData])

  const { formState: { errors }, getValues, clearErrors, setError, reset } = useForm()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const { chat } = getValues()
    clearErrors(['chat'])

    // if (chat?.trim() && chatData) {
    //   const savedChat = chat

    //   mutateChat((prevChatData) => {
    //     prevChatData?.[0].unshift({
    //       id: (chatData[0][0]?.id || 0) + 1,
    //       content: savedChat,
    //       SenderId: myData?.id,
    //       Sender: myData,
    //       ReceiverId: userData?.id,
    //       Receiver: userData,
    //       createdAt: new Date(),
    //     })

    //     return prevChatData

    //   }, false).then(() => {

    //     reset({ chat: '' })

    //     localStorage.setItem(`${workspace}-${id}`, new Date().getTime().toString())

    //     // if (scrollbarRef.current) {
    //     //   console.log('scrollToBottom!', scrollbarRef.current?.getValues())
    //     //   scrollbarRef.current.scrollToBottom()
    //     // }
    //   })
    axios
      .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
        content: chat,
      })
      .catch(console.error)
    // }
    reset({ chat: '' })
  }

  return (
    <div css={rootStyle}>
      <ChatHeader>
        <img src={gravatar.url(user?.email, { s: '30px', d: 'retro' })} alt={user?.nickname} css={headerImageStyle} />
        <span css={headerSubTitleStyle}>{user?.nickname}</span>
      </ChatHeader>
      <ChatList
        scrollbarRef={scrollbarRef}
        setSize={setSize}
        chatData={chatData}
      />
      {/* <ChatInput onSubmit={handleSubmit} /> */}
    </div>
  )
}

export default DirectChat