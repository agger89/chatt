import React, { FC } from 'react'
import { useParams } from 'react-router'
import useSWR from 'swr'
import fetcher from 'utils/fetch'
import { css } from '@emotion/core'
import Profile from 'components/Profile'

const rootStyle = css`
  padding: 40px 34px 20px;
  border-bottom: 2px solid #2E334D;
`

interface ChatHeaderProps { }

const ChatHeader: FC = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>()
  const { data: user } = useSWR<any>(`/api/workspaces/${workspace}/users/${id}`, fetcher)

  return (
    <div css={rootStyle}>
      <Profile user={user} />
    </div>
  )
}

export default ChatHeader