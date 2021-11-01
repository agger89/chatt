import React, { FC } from 'react'
import { css } from '@emotion/core'
import { Box } from '@material-ui/core'

const rootStyle = css`
  display: flex;
  align-items: center;
  padding: 40px 34px 20px;
  border-bottom: 2px solid #2E334D;
`

const ChatHeader: FC = ({ children }) => (
  <Box css={rootStyle}>
    {children}
  </Box>
)

export default ChatHeader