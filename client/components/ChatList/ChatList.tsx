import React, { FC } from 'react'

interface ChatListProps {
  chatSections: { [key: string]: (any | any)[] };
}

const ChatList: FC<ChatListProps> = ({ chatSections }) => {

  console.log('chatSections', chatSections)
  return (
    <>
      {Object.entries(chatSections).map(([date, chats]) => {
        return (
          <div className={`section-${date}`} key={date}>
            <div>
              <button>{date}</button>
            </div>
            {chats.map((chat) => (
              <div>{chat}</div>
            ))}
          </div>
        )
      })}
    </>
  )
}

export default ChatList