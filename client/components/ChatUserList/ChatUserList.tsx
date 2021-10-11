import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { css } from '@emotion/core'
import useSWR from 'swr'
import fetcher from 'utils/fetch'
import gravatar from 'gravatar'

const profileImageStyle = css`
  border-radius: 50%;
`

const rootStyle = css`
  width: 370px;
  border-right: 4px solid #2B2F49;
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
            <li css={chatUserListItemStyle} key={chatUser.id}>
              <span css={chatUserProfileStyle}>
                <span css={profileImageWrapStyle}>
                  <img css={profileImageStyle} src={gravatar.url(chatUser?.email, { s: '40px', d: 'retro' })} alt={chatUser?.nickname} />
                  <span css={isOnlineStyle} />
                </span>
                <span css={chatUserNicknameStyle}>
                  <span css={nicknameStyle}>{chatUser.nickname}</span>
                  <span css={lastCommentStyle}>last comment area</span>
                </span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ChatUserList