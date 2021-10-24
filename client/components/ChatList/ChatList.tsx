import React, { FC } from 'react'
import { css } from '@emotion/core'
import Chat from './Chat'

const rootStyle = css`
  margin: 10px 36px;
  overflow: auto;
`

const dateBlockStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2px;
  background-color: #2E334D;
`

const dateStyle = css`
  padding: 0 20px;
  background-color: #282C44;
  font-family: monospace;
  font-weight: 600;
  font-size: 14px;
  color: #666B85;
`

interface ChatListProps {
  chatSections: { [key: string]: (any | any)[] }
}

const ChatList: FC<ChatListProps> = ({ chatSections }) => {

  return (
    <div css={rootStyle}>
      {Object.entries(chatSections).map(([date, chats]) => {
        return (
          <div className={`section-${date}`} key={date}>
            <div css={dateBlockStyle}>
              <span css={dateStyle}>{date}</span>
            </div>
            {chats.map((chat, idx) => (
              <Chat chat={chat} senderID={chat.SenderId} key={idx} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default ChatList