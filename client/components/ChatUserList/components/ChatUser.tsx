import React, { FC } from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import useSWR from 'swr'
import fetcher from 'utils/fetch'
import { css } from '@emotion/core'
import Profile from 'components/Profile'

const rootStyle = css`
  padding: 0;
`

const linkStyle = css`
  display: block;
  text-decoration: none;
  &.selected {
    li  {
      background-color: #476EEE;
    }
    * {
      color: #fff;
    }
  }
`

const listStyle = css`
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
  user: any
}

const ChatUser: FC<ChatUserProps> = ({ user }) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>()
  const { data: chatUsers } = useSWR<any[]>(
    user ? `/api/workspaces/sleact/members` : null,
    fetcher,
  )

  return (
    <ul css={rootStyle}>
      {chatUsers?.map((user: any) => (
        <NavLink key={user.id} css={linkStyle} activeClassName="selected" to={`/workspace/${workspace}/dm/${user.id}`}>
          <li css={listStyle} key={user.id}>
            <Profile user={user} />
          </li>
        </NavLink>
      ))}
    </ul>
  )
}

export default ChatUser