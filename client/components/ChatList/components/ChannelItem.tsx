import React, { useEffect, FC } from 'react'
import { useParams } from 'react-router'
import { NavLink, useLocation } from 'react-router-dom'
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

const rootStyle = css`
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

interface ChannelItemProps {
  channel: any
}

const ChannelItem: FC<ChannelItemProps> = ({ channel }) => {
  const { workspace } = useParams<{ workspace?: string }>()
  const location = useLocation()
  const { data: userData } = useSWR<any>('/api/users', fetcher, {
    dedupingInterval: 2000,
  })
  const date = localStorage.getItem(`${workspace}-${channel.name}`) || 0
  const { data: count, mutate } = useSWR<number>(
    userData ? `/api/workspaces/${workspace}/channels/${channel.name}/unreads?after=${date}` : null,
    fetcher,
  )

  useEffect(() => {
    if (location.pathname === `/workspace/${workspace}/channel/${channel.name}`) {
      mutate(0)
    }
  }, [mutate, location.pathname, workspace, channel])

  return (
    <NavLink activeClassName="selected" to={`/workspace/${workspace}/channel/${channel.name}`} css={linkStyle}>
      <div css={rootStyle}>단톡방</div>
    </NavLink>
  )
}

export default ChannelItem