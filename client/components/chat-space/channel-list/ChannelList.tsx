import React, { FC, useState } from 'react'
import { css } from '@emotion/core'
import { Box, Button } from '@material-ui/core'
import PersonAddIcon from '@mui/icons-material/PersonAddAlt'
import GroupMessageList from './components/GroupMessageList'
import DirectMessageList from './components/DirectMessageList'
import InviteWorkspaceModal from './InviteChatSpaceModal'

const rootStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 370px;
  padding: 30px 0;
  border-right: 2px solid #2E334D;
`

const buttonGroupStyle = css`
  width: 100%;
  padding-right: 20px;
  text-align: right;
`

const buttonStyle = css`
  color: #fff !important;
`
interface ChannelListProps {
  user: any
}

const ChannelList: FC<ChannelListProps> = ({ user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleClickModalOpen = () => {
    setModalIsOpen(true)
  }

  return (
    <Box css={rootStyle}>
      <div css={buttonGroupStyle}>
        <Button
          onClick={handleClickModalOpen}
          css={buttonStyle}
        >
          <PersonAddIcon />
        </Button>
      </div>
      <GroupMessageList />
      <DirectMessageList user={user} />
      <InviteWorkspaceModal
        modalIsOpen={modalIsOpen}
        onModalIsOpen={setModalIsOpen}
      />
    </Box>
  )
}

export default ChannelList