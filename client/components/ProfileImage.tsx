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
}

const ProfileImage: FC<ProfileImageProps> = ({ user }) => {

  return (
    <img css={rootStyle} src={gravatar.url(user?.email, { s: '40px', d: 'retro' })} alt={user?.nickname} />
  )
}

export default ProfileImage