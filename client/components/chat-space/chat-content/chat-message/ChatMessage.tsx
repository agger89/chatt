import React, { FC, useCallback } from 'react'
import { css } from '@emotion/core'
import { Scrollbars } from 'react-custom-scrollbars-2'
import buildSection from 'utils/buildSection'
import ChatItem from './ChatMessageItem'

const rootStyle = css`
  display: flex;
  flex: 1 1 0%;
  margin: 10px 26px;
`

const sectionStyle = css`
  margin-top: 20px;
  border-top: 2px solid #2E334D;
`

const dateBlockStyle = css`
  position: sticky;
  top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`

const dateStyle = css`
  position: absolute;
  top: -12px;
  padding: 0 20px;
  background-color: #282C44;
  font-family: monospace;
  font-weight: 600;
  font-size: 14px;
  color: #666B85;
`

interface ChatMessageProps {
  scrollbarRef: any
  setSize: (value: any) => any
  chatData: any
}

export const PAGE_SIZE = 20
const ChatMessage: FC<ChatMessageProps> = ({ scrollbarRef, setSize, chatData }) => {
  if (!chatData) {
    return null
  }

  const isEmpty = chatData[0].length === 0
  const isReachingEnd = chatData[chatData.length - 1].length < PAGE_SIZE

  const newChatData = chatData ? [].concat(...chatData).reverse() : []
  const chatSections = buildSection(newChatData)

  const onScroll = useCallback(
    (values) => {
      if (values.scrollTop === 0 && !isReachingEnd && !isEmpty) {

        setSize((size: number) => size + 1).then(() => {
          scrollbarRef.current?.scrollTop(scrollbarRef.current?.getScrollHeight() - values.scrollHeight);
        })

      }
    },
    [setSize, scrollbarRef, isReachingEnd, isEmpty],
  )

  return (
    <div css={rootStyle}>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <div css={sectionStyle} className={`section-${date}`} key={date}>
              <div css={dateBlockStyle}>
                <span css={dateStyle}>{date}</span>
              </div>
              {chats.map((chat, idx) => (
                <ChatItem chat={chat} key={idx} />
              ))}
            </div>
          )
        })}
      </Scrollbars>
    </div>
  )
}

export default ChatMessage