import React, { FC, memo, useMemo } from 'react'
import { css } from '@emotion/core'
import { Link, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import ProfileImage from 'components/ProfileImage'

const rootStyle = css`
  display: flex;
  align-items: center;
  margin: 30px 0;
`

const profileBlockStyle = css`
  margin-right: 10px;
`

const contentInfoBlockStyle = css`
  font-size: 14px;
  color: #666B85;
`

const contentStyle = css`
  margin: 0;
  padding: 12px 14px;
  background-color: #2E334D;
  border-radius: 10px;
  border-top-left-radius: 0;
  font-family: monospace;
  color: #fff;
`

interface ChatProps {
  chat: any
}

const Chat: FC<ChatProps> = ({ chat }) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>()
  const user = 'Sender' in chat ? chat.Sender : chat.User
  console.log('chat', chat)
  console.log('user', user)
  console.log('workspace', workspace)

  return (
    <div css={rootStyle}>
      <div css={profileBlockStyle}>
        <ProfileImage user={{
          email: user?.email, nickname: user?.nickname,
        }} size="30" />
      </div>
      <div>
        <div css={contentInfoBlockStyle}>
          <span>{user.nickname},</span>{" "}
          <span>{dayjs(chat.createdAt).format('h:mm A')}</span>
        </div>
        <p css={contentStyle}>{chat.content}</p>
      </div>
    </div>
  );
};

export default memo(Chat);