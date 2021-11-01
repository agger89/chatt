import React, { FC, useState } from 'react'
import { css } from '@emotion/core'
import { Dialog, Box, Button, Typography, Snackbar, Slide } from '@material-ui/core'

const formStyle = css`
  padding: 20px 80px;
`

interface ModalFormProps {
  modalIsOpen: boolean
  onModalIsOpen: (value: boolean) => void
  onSubmit: (value: any) => void
  snackbarOpen: boolean
  onSnackbarOpen: (value: boolean) => void
  snackbarMessage: string
}

const ModalForm: FC<ModalFormProps> = ({ modalIsOpen, onModalIsOpen, onSubmit, snackbarOpen, onSnackbarOpen, snackbarMessage, children }) => {
  const handleCloseModal = () => {
    onModalIsOpen(false)
  }

  const handleSnackbarClose = () => {
    onSnackbarOpen(false)
  }

  return (
    <>
      <Dialog onClose={handleCloseModal} open={modalIsOpen}>
        <form onSubmit={onSubmit} css={formStyle}>
          {children}
        </form>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={1000}
        TransitionComponent={Slide}
        message={<span>{snackbarMessage}</span>}
        key='slide'
      />
    </>
  )
}

export default ModalForm