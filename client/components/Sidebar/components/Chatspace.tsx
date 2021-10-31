import React, { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { css } from '@emotion/core'
import { Box, Button } from '@material-ui/core'
import ChatspaceCreateModal from './ChatspaceCreateModal'

const rootStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const linkStyle = css`
  margin-bottom: 20px;
  text-decoration: none;
  &:hover {
    span {
      background-color: #282C44;
      color: #fff;
      border-radius: 10px;
    }
  }
  &.selected {
    span  {
      background-color: #282C44;
      color: #fff;
      border-radius: 10px;
    }
  }
`

const textStyle = css`
  display: inline-block;
  padding: 8px 18px;
  font-size: 24px;
  font-weight: 800;
  color: #666B85;
`

const buttonStyle = css`
  font-size: 20px !important;
  color: #fff !important;
`

interface ChatspaceProps {
  user: any
}

const Chatspace: FC<ChatspaceProps> = ({ user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleOpenModal = () => {
    setModalIsOpen(true)
  }

  return (
    <>
      <Box css={rootStyle}>
        {user?.Workspaces.map((item: any) => (
          <NavLink key={item.id} to={`/workspace/${item.url}/channel/일반`} css={linkStyle} activeClassName="selected">
            <span css={textStyle}>{item.name.slice(0, 1).toUpperCase()}</span>
          </NavLink>
        ))}
        <Button onClick={handleOpenModal} css={buttonStyle}>+</Button>
      </Box>
      <ChatspaceCreateModal modalIsOpen={modalIsOpen} onModalIsOpen={setModalIsOpen} />
    </>
  )
}

export default Chatspace