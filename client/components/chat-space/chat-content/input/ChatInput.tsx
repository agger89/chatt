import React, { FC } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import fetcher from 'utils/fetch'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite';
import { css } from '@emotion/core'
import { FormControl } from '@material-ui/core'
import { Controller, useForm } from "react-hook-form"
import ChatMention from './ChatMention'

const rootStyle = css`
  padding: 44px 34px;
  border-top: 2px solid #2E334D;
`

const formControlStyle = css`
  width: 100%;
  & strong {
    background-color: rgb(71, 110, 238);
  }
  & textarea {
    border: none;
    outline: none;
    color: #fff;
	  caret-color: #fff;
  }
`

interface ChatInputProps {
  onSubmit: () => void
  control: any
}

const PAGE_SIZE = 20
const ChatInput: FC<ChatInputProps> = ({ onSubmit, control }) => {
  const { workspace, channel, id } = useParams<{ workspace: string; channel: string; id: string }>()
  // const { workspace, id } = useParams<{ workspace: string; id: string }>()
  const { data: myData } = useSWR('/api/user', fetcher) as any
  const { data: userData } = useSWR(`/api/workspace/${workspace}/user/${id}`, fetcher) as any
  const { data: chatData, mutate: mutateChat, setSize } = useSWRInfinite<any[]>(
    (index: number) => `/api/workspace/${workspace}/dm/${id}/chats?perPage=${PAGE_SIZE}&page=${index + 1}`,
    fetcher,
  )

  return (
    <div css={rootStyle}>
      <form onSubmit={onSubmit}>
        <FormControl css={formControlStyle}>
          <Controller
            control={control}
            name="chat"
            render={({ field: { onChange, value } }) => (
              <ChatMention userData={userData} onSubmit={onSubmit} onChange={onChange} value={value} />
            )}
          />
        </FormControl>
      </form>
    </div >
  )
}

export default ChatInput