import React, { FC } from 'react'
import useSWR from 'swr'
import { css } from '@emotion/core'
import fetcher from 'utils/fetch'
import ProfileImage from 'components/ProfileImage'

const rootStyle = css`
  display: flex;
  align-items: center;
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

interface ChattProfileProps {
  user: any
}

const ChattProfile: FC<ChattProfileProps> = ({ user }) => {
  const { data: users } = useSWR<any>('/api/users', fetcher, {
    dedupingInterval: 2000,
  })

  return (
    <div css={rootStyle}>
      <span css={profileImageWrapStyle}>
        <ProfileImage user={{
          email: user?.email, nickname: user?.nickname,
        }} />
        <span css={isOnlineStyle} />
      </span>
      <span css={chatUserNicknameStyle}>
        <span css={nicknameStyle}>
          {user?.nickname}
          {user?.id === users?.id && <span>이거나야</span>}
        </span>
        <span css={lastCommentStyle}>last comment area</span>
      </span>
    </div>
  )
}

export default ChattProfile