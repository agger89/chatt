import React, { FC } from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import useSWR from 'swr'
import { css } from '@emotion/core'
import fetcher from 'utils/fetch'

const linkStyle = css`
  text-decoration: none;
  &.selected {
    div  {
      background-color: #476EEE;
      color: #fff;
    }
  }
`

const textStyle = css`
  display: flex;
  align-items: center;
  width: 310px;
  height: 78px;
  padding: 20px 16px;
  background-color: #2E334D;
  border-radius: 10px;
  list-style: none;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
`

interface GroupMessageListProps {
  channelData?: any[]
  userData?: any
}

const GroupMessageList: FC<GroupMessageListProps> = () => {
  const { workspace } = useParams<{ workspace?: string }>()
  const { data: user } = useSWR<any>('/api/users', fetcher, {
    dedupingInterval: 2000,
  })
  const { data: channelData } = useSWR<any[]>(user ? `/api/workspaces/${workspace}/channels` : null, fetcher)

  return (
    <>
      {channelData?.map((channel, idx) => (
        <NavLink activeClassName="selected" to={`/workspace/${workspace}/channel/${channel.name}`} css={linkStyle} key={idx}>
          <div css={textStyle}>단톡방</div>
        </NavLink>
      ))}
    </>
  )
}

export default GroupMessageList