import React, { FC } from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import useSWR from 'swr'
import { css } from '@emotion/core'
import { Typography } from '@material-ui/core'
import fetcher from 'utils/fetch'
import Profile from '../../Profile'

const rootStyle = css`
  margin-top: 20px;
  overflow-y: scroll;
`

const listGroupStyle = css`
  padding: 0;
  margin: 0;
`

const titleStyle = css`
  margin-bottom: 6px !important;
  color: #666B85;
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

interface DirectMessageListProps {
  user: any
}

const DirectMessageList: FC<DirectMessageListProps> = ({ user }) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>()
  const { data: chatUsers } = useSWR<any[]>(
    user ? `/api/workspaces/sleact/members` : null,
    fetcher,
  )

  return (
    <div css={rootStyle}>
      <Typography css={titleStyle}>Direct Messages</Typography>
      <ul css={listGroupStyle}>
        {chatUsers?.map((user: any) => (
          <NavLink key={user.id} css={linkStyle} activeClassName="selected" to={`/workspace/${workspace}/dm/${user.id}`}>
            <li css={listStyle} key={user.id}>
              <Profile user={user} />
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  )
}

export default DirectMessageList