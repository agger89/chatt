import React, { FC, memo } from 'react'
import useSWR from 'swr'
import fetcher from 'utils/fetch'
import { css } from '@emotion/core'
import { Box } from '@material-ui/core'
import { useParams } from 'react-router-dom'
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
  const { data: myData } = useSWR<any>('/api/users', fetcher)
  const user = chat.Sender
  const senderID = chat.SenderId

  const me = myData.id === senderID

  return (
    <Box css={rootStyle} style={{ justifyContent: !me ? 'flex-end' : 'initial' }}>
      <Box css={profileBlockStyle}>
        <ProfileImage user={{
          email: user?.email, nickname: user?.nickname,
        }} size="30" />
      </Box>
      <Box>
        <Box css={contentInfoBlockStyle}>
          <span>{user.nickname},</span>{" "}
          <span>{dayjs(chat.createdAt).format('h:mm A')}</span>
        </Box>
        <p css={contentStyle} style={{ backgroundColor: !me ? '#476EEE' : '#2E334D' }}>{chat.content}</p>
      </Box>
    </Box>
  );
};

export default memo(Chat);