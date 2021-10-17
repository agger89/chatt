import React, { FC } from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { css } from '@emotion/core'
import ChattProfile from 'components/ChattProfile'

const rootStyle = css`
  text-decoration: none;
  &.selected {
    li > span {
      background-color: #476EEE;
    }
  }
`

const chatUserListItemStyle = css`
  display: flex;
  align-items: center;
  width: 310px;
  height: 78px;
  padding: 20px 16px;
  background-color: #2E334D;
  border-radius: 10px;
  list-style: none;
  margin-bottom: 12px;
`

interface ChatUserProps {
  chatUser: any
}

const ChatUser: FC<ChatUserProps> = ({ chatUser }) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();

  console.log('workspace11', workspace)
  return (
    <NavLink key={chatUser.id} css={rootStyle} activeClassName="selected" to={`/workspace/${workspace}/dm/${chatUser.id}`}>
      <li css={chatUserListItemStyle} key={chatUser.id}>
        <ChattProfile user={chatUser} />
      </li>
    </NavLink>
  )
}

export default ChatUser