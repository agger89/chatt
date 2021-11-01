import React, { FC, useRef, useEffect, ReactNode } from 'react'
import { useParams } from 'react-router'
import useSWR from 'swr'
import fetcher from 'utils/fetch'
import gravatar from 'gravatar'
import { css } from '@emotion/core'
import { Mention, SuggestionDataItem, MentionsInput } from 'react-mentions'

const suggetionStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 20px;
  color: rgb(28, 29, 28);
  & img {
    margin-right: 5px;
  }
  &:hover {
    background: #476EEE;
    color: #fff;
  }
`

interface ChatMentionProps {
  userData: any
  onSubmit: (value: any) => void
  onChange: () => void
  value: any
}

const ChatMention: FC<ChatMentionProps> = ({ userData, onSubmit, onChange, value }) => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>()
  const { data: memberData } = useSWR<any[]>(userData ? `/api/workspaces/${workspace}/members` : null, fetcher)
  const chatRef = useRef<HTMLTextAreaElement>(null)


  useEffect(() => {
    chatRef.current?.focus()
  }, [])

  const handleKeydownChat = (e: any) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault()
        onSubmit(e)
      }
    }
  }

  const rendererSuggestionUser = (
    suggestion: SuggestionDataItem,
    search: string,
    highlightedDisplay: ReactNode,
    index: number,
    focus: boolean,
  ): ReactNode => {

    if (!memberData) return

    return (
      <div css={suggetionStyle}>
        <img
          src={gravatar.url(memberData[index].email, { s: '20px', d: 'retro' })}
          alt={memberData[index].nickname}
        />
        <span>{highlightedDisplay}</span>
      </div>
    )
  }

  return (
    <MentionsInput
      id="editor-chat"
      value={value}
      onChange={onChange}
      onKeyPress={handleKeydownChat}
      placeholder="Enter what you want to say"
      inputRef={chatRef}
      allowSuggestionsAboveCursor
    >
      <Mention
        displayTransform={(_, name) => `@${name}`}
        appendSpaceOnAdd
        trigger="@"
        data={memberData?.map((member) => ({ id: member.id, display: member.nickname })) || []}
        renderSuggestion={rendererSuggestionUser}
      />
    </MentionsInput>
  )
}

export default ChatMention