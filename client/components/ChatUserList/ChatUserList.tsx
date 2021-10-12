import React, { FC } from 'react'
import { css } from '@emotion/core'
import useSWR from 'swr'
import fetcher from 'utils/fetch'
import ChatUser from './ChatUser'

const rootStyle = css`
  display: flex;
  justify-content: center;
  width: 370px;
  border-right: 4px solid #2B2F49;
  padding-top: 60px;
  ul {
    padding: 0;
  }
`
interface ChatUserListProps {
  user: any
}

const ChatUserList: FC<ChatUserListProps> = ({ user }) => {
  const { data: chatUsers } = useSWR<any[]>(
    user ? `/api/workspaces/sleact/members` : null,
    fetcher,
  )

  return (
    <div css={rootStyle}>
      <ul>
        {chatUsers?.map(chatUser => {
          return (
            <ChatUser key={chatUser.id} chatUser={chatUser} />
          )
        })}
      </ul>
    </div>
  )
}

export default ChatUserList