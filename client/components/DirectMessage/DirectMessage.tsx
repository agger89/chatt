import React, { FC } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { css } from '@emotion/core'
import useSocket from 'hooks/useSocket'
import fetcher from 'utils/fetch'
import buildSection from 'utils/buildSection'
import { ChatList } from 'components/ChatList'
import { ChatInput } from 'components/ChatInput'
import Header from './Header'

const rootStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`

const PAGE_SIZE = 20
const DirectMessage: FC = () => {
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
    fetcher,
    {
      onSuccess(data) {
        console.log('data')
      },
    },
  )

  const chatSections = buildSection(chatData ? ([] as any[]).concat(...chatData).reverse() : []);

  return (
    <div css={rootStyle}>
      <Header user={user} />
      <ChatList
        chatSections={chatSections}
      />
      <ChatInput />
    </div>
  )
}

export default DirectMessage