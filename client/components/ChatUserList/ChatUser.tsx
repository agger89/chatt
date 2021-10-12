import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import useSWR from 'swr'
import { css } from '@emotion/core'
import gravatar from 'gravatar'
import fetcher from 'utils/fetch'

const rootStyle = css`
  text-decoration: none;
  &.selected {
    li > span {
      background-color: #476EEE;
    }
  }
`

const profileImageStyle = css`
  border-radius: 50%;
`

const chatUserListItemStyle = css`
  list-style: none;
  margin-bottom: 12px;
`

const chatUserProfileStyle = css`
  display: flex;
  align-items: center;
  width: 310px;
  height: 78px;
  padding: 20px 16px;
  background-color: #2E334D;
  border-radius: 10px;
`

const profileImageWrapStyle = css`
  position: relative;
`

const isOnlineStyle = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -8px;
  display: block;
  width: 12px;
  height: 12px;
  background-color: #14B65C;
  border: 2px solid #2E334D;
  border-radius: 50%;
`

const chatUserNicknameStyle = css`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  font-family: monospace;
`

const nicknameStyle = css`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
`

const lastCommentStyle = css`
  color: #666B85;
`

const ChatUser = ({ chatUser }: any) => {
  const workspace = 'sleact'

  const { data: userData } = useSWR<any>('/api/users', fetcher, {
    dedupingInterval: 2000,
  })

  return (
    <NavLink key={chatUser.id} css={rootStyle} activeClassName="selected" to={`/workspace/${workspace}/dm/${chatUser.id}`}>
      <li css={chatUserListItemStyle} key={chatUser.id}>
        <span css={chatUserProfileStyle}>
          <span css={profileImageWrapStyle}>
            <img css={profileImageStyle} src={gravatar.url(chatUser?.email, { s: '40px', d: 'retro' })} alt={chatUser?.nickname} />
            <span css={isOnlineStyle} />
          </span>
          <span css={chatUserNicknameStyle}>
            <span css={nicknameStyle}>
              {chatUser.nickname}
              {chatUser.id === userData?.id && <span>이거나야</span>}
            </span>
            <span css={lastCommentStyle}>last comment area</span>
          </span>
        </span>
      </li>

    </NavLink>
  )
}

export default ChatUser