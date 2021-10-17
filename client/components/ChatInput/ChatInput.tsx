import React, { FC, useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import useSWR from 'swr'
import { css } from '@emotion/core'
import { FormControl, TextField, Button, Snackbar, Slide } from '@material-ui/core'
import { Controller, useForm } from "react-hook-form"

const rootStyle = css`
  padding: 44px 34px;
  border-top: 2px solid #2E334D;
`
const formControlStyle = css`
  width: 100%;
  .MuiInput-underline:before {
    content: none;
  }
`
const textfieldStyle = css`
  .MuiInput-underline:before {
    content: none;
  }
  .MuiInput-underline:after {
    content: none;
  }
  .MuiInputBase-root {
    color: #fff;
  }
`

interface ChatInputProps {

}

const ChatInput: FC<ChatInputProps> = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>()
  const [chat, setChat] = useState('')
  const { handleSubmit, control, formState: { errors }, getValues, clearErrors, setError } = useForm()
  const chatRef = useRef<HTMLInputElement>()

  useEffect(() => {
    chatRef.current?.focus()
  }, [])

  const onSubmit = (e: any) => {
    e.preventDefault()
    const { chat } = getValues()
    clearErrors(['chat'])
    console.log('chat', chat)
    axios
      .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
        content: chat,
      })
      .catch(console.error)
    // if (chat?.trim() && chatData) {
    //   const savedChat = chat
    //   mutateChat((prevChatData) => {
    //     prevChatData?.[0].unshift({
    //       id: (chatData[0][0]?.id || 0) + 1,
    //       content: savedChat,
    //       SenderId: myData.id,
    //       Sender: myData,
    //       ReceiverId: userData.id,
    //       Receiver: userData,
    //       createdAt: new Date(),
    //     })
    //     return prevChatData
    //   }, false).then(() => {
    //     localStorage.setItem(`${workspace}-${id}`, new Date().getTime().toString())
    //     setChat('')
    //     if (scrollbarRef.current) {
    //       console.log('scrollToBottom!', scrollbarRef.current?.getValues())
    //       scrollbarRef.current.scrollToBottom()
    //     }
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

  return (
    <div css={rootStyle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl css={formControlStyle}>
          <Controller
            control={control}
            name="chat"
            render={({ field: { onChange, value } }) => (
              <TextField
                id="outlined-basic"
                onChange={onChange}
                value={value}
                inputRef={chatRef}
                css={textfieldStyle}
                multiline
                onKeyPress={handleKeydownChat}
                placeholder="Enter what you want to say"
              />
            )}
          />
        </FormControl>
      </form>
    </div>
  )
}

export default ChatInput