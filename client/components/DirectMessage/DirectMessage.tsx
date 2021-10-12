import React, { FC } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import gravatar from 'gravatar'
import { css } from '@emotion/core'
import useSocket from 'hooks/useSocket'
import fetcher from 'utils/fetch'
import buildSection from 'utils/buildSection'
import { ChatList } from 'components/ChatList'

const rootStyle = css`
`

const headerStyle = css`
`


const PAGE_SIZE = 20
const DirectMessage: FC = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>()
  const [socket] = useSocket(workspace)
  const { data: myData } = useSWR<any>('/api/users', fetcher)
  const { data: userData } = useSWR<any>(`/api/workspaces/${workspace}/users/${id}`, fetcher)
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
      <div css={headerStyle}>
        <img src={gravatar.url(userData?.email, { s: '24px', d: 'retro' })} alt={userData?.nickname} />
        <span>{userData?.nickname}</span>
      </div>
      <ChatList
        chatSections={chatSections}
      />
    </div>
  )
}

export default DirectMessage