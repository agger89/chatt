import React, { FC, useRef, useEffect } from 'react'
import { useParams } from 'react-router'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import useSocket from 'hooks/useSocket'
import { css } from '@emotion/core'
import fetcher from 'utils/fetch'
import ChatHeader from './components/ChatHeader'
import ChatInput from './components/input/ChatInput'
import ChatList from './components/ChatList'

const rootStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`

export const PAGE_SIZE = 20
const ChatMessage: FC = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>()
  const [socket] = useSocket(workspace)
  const { data: myData } = useSWR<any>('/api/users', fetcher)
  const { data: user } = useSWR<any>(`/api/workspaces/${workspace}/users/${id}`, fetcher)
  const {
    data: chatData,
    mutate: mutateChat,
    setSize,
  } = useSWRInfinite<any[]>(
    (index) => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=${PAGE_SIZE}&page=${index + 1}`,
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

  return (
    <div css={rootStyle}>
      <ChatHeader />
      <ChatList
        scrollbarRef={scrollbarRef}
        setSize={setSize}
        chatData={chatData}
      />
      <ChatInput />
    </div>
  )
}

export default ChatMessage