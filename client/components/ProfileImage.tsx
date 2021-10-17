import React, { FC } from 'react'
import { css } from '@emotion/core'
import gravatar from 'gravatar'

const rootStyle = css`
  border-radius: 50%;
`

interface User {
  email: string
  nickname: string
}

interface ProfileImageProps {
  user: User
  size?: string
}

const ProfileImage: FC<ProfileImageProps> = ({ user, size }) => {

  return (
    <img css={rootStyle} src={gravatar.url(user?.email, { s: size ?? '40px', d: 'retro' })} alt={user?.nickname} />
  )
}

export default ProfileImage