import React, { FC } from 'react'
import { useParams } from 'react-router'
import useSWR from 'swr'
import { Box } from '@material-ui/core'
import fetcher from 'utils/fetch'
import ChannelItem from './ChannelItem'

interface ChannelListProps {
  channelData?: any[]
  userData?: any
}

const ChannelList: FC<ChannelListProps> = () => {
  const { workspace } = useParams<{ workspace?: string }>()
  const { data: user } = useSWR<any>('/api/users', fetcher, {
    dedupingInterval: 2000,
  })
  const { data: channelData } = useSWR<any[]>(user ? `/api/workspaces/${workspace}/channels` : null, fetcher)

  return (
    <Box>
      {channelData?.map((channel) => (
        <ChannelItem key={channel.id} channel={channel} />
      ))}
    </Box>
  );
};

export default ChannelList;