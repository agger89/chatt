import React, { FC } from 'react'
import { css } from '@emotion/core'
import ProfileImage from 'components/ProfileImage'
import ChattProfile from 'components/ChattProfile'

const rootStyle = css`
  padding: 40px 34px 20px;
  border-bottom: 2px solid #2E334D;
`

interface HeaderProps {
  user: any
}

const Header: FC<HeaderProps> = ({ user }) => {

  return (
    <div css={rootStyle}>
      <ChattProfile user={user} />
    </div>
  )
}

export default Header