import React, { FC, useState, useRef, useEffect, ReactNode } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import fetcher from 'utils/fetch'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import gravatar from 'gravatar'
import { css } from '@emotion/core'
import { FormControl, TextField, Button, Snackbar, Slide } from '@material-ui/core'
import { Controller, useForm } from "react-hook-form"
import { Mention, SuggestionDataItem, MentionsInput } from 'react-mentions'

const rootStyle = css`
  padding: 44px 34px;
  border-top: 2px solid #2E334D;
`

const formControlStyle = css`
  width: 100%;
  & textarea {
    border: none;
    outline: none;
    color: #fff;
	  caret-color: #fff;
  }
`

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

const PAGE_SIZE = 20
const ChatInput: FC = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>()

  const { data: myData } = useSWR('/api/user', fetcher) as any
  const { data: userData } = useSWR(`/api/workspace/${workspace}/user/${id}`, fetcher) as any
  const { data: chatData, mutate: mutateChat, setSize } = useSWRInfinite<any[]>(
    (index) => `/api/workspace/${workspace}/dm/${id}/chats?perPage=${PAGE_SIZE}&page=${index + 1}`,
    fetcher,
  )
  const { data: memberData } = useSWR<any[]>(userData ? `/api/workspaces/${workspace}/members` : null, fetcher)

  const { handleSubmit, control, formState: { errors }, getValues, clearErrors, setError, reset } = useForm()
  const chatRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    chatRef.current?.focus()
  }, [])

  const onSubmit = (e: any) => {
    e.preventDefault()
    const { chat } = getValues()
    clearErrors(['chat'])

    // if (chat?.trim() && chatData) {
    //   const savedChat = chat

    //   mutateChat((prevChatData) => {
    //     prevChatData?.[0].unshift({
    //       id: (chatData[0][0]?.id || 0) + 1,
    //       content: savedChat,
    //       SenderId: myData?.id,
    //       Sender: myData,
    //       ReceiverId: userData?.id,
    //       Receiver: userData,
    //       createdAt: new Date(),
    //     })

    //     return prevChatData

    //   }, false).then(() => {

    //     reset({ chat: '' })

    //     localStorage.setItem(`${workspace}-${id}`, new Date().getTime().toString())

    //     // if (scrollbarRef.current) {
    //     //   console.log('scrollToBottom!', scrollbarRef.current?.getValues())
    //     //   scrollbarRef.current.scrollToBottom()
    //     // }
    //   })
    //   axios
    //     .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
    //       content: chat,
    //     })
    //     .catch(console.error)
    // }
  }

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
    <div css={rootStyle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl css={formControlStyle}>
          <Controller
            control={control}
            name="chat"
            render={({ field: { onChange, value } }) => (
              <MentionsInput
                id="editor-chat"
                value={value}
                onChange={onChange}
                onKeyPress={handleKeydownChat}
                placeholder="Enter what you want to say"
                inputRef={chatRef}
                allowSuggestionsAboveCursor
                style={{ borderRadius: '10px' }}
              >
                <Mention
                  appendSpaceOnAdd
                  trigger="@"
                  data={memberData?.map((v) => ({ id: v.id, display: v.nickname })) || []}
                  renderSuggestion={rendererSuggestionUser}
                  style={{ borderRadius: '10px' }}
                />
              </MentionsInput>
            )}
          />
        </FormControl>
      </form>
    </div>
  )
}

export default ChatInput