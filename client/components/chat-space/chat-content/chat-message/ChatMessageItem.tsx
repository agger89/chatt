import React, { FC, memo } from 'react'
import { css } from '@emotion/core'
import { Box } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import ProfileImage from '../../ProfileImage'

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

interface ChatMessageItemProps {
  chat: any
}

const ChatMessageItem: FC<ChatMessageItemProps> = ({ chat }) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>()

  const user = 'Sender' in chat ? chat.Sender : chat.User;
  const senderID = chat.SenderId

  return (
    <Box css={rootStyle}>
      <Box css={profileBlockStyle}>
        <ProfileImage user={{
          email: user?.email, nickname: user?.nickname,
        }} size="30" />
      </Box>
      <Box>
        <Box css={contentInfoBlockStyle}>
          <span>{user?.nickname},</span>{" "}
          <span>{dayjs(chat.createdAt).format('h:mm A')}</span>
        </Box>
        <p css={contentStyle}>{chat.content}</p>
      </Box>
    </Box>
  );
};

export default memo(ChatMessageItem)