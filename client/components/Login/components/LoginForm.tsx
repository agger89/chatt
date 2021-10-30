import React, { FC, useState, useRef } from 'react'
import axios from 'axios'
import { Controller, useForm } from "react-hook-form"
import { css } from '@emotion/core'
import { FormControl, TextField, Button, Snackbar, Slide } from '@material-ui/core'

const formStyle = css`
  padding: 60px 0 40px;

  .MuiButton-root {
    padding: 10px 0;
    background-color: #5368B6;
    font-weight: 600;
    color: #fff;

    &:hover {
      background-color: #476EEE;
    }
  }
`

const formControlStyle = css`
  width: 100%;
  margin-bottom: 40px !important;

  .MuiFormControl-root {
    margin-bottom: 24px;
    
    &:hover {
      .MuiFormLabel-root {
        color: #fff;
      }
    }
  }
`

const textfieldStyle = css`
  width: 100%;
  border-radius: 10px;
  
  .MuiInputBase-root {
    background-color: #2E334D;
    color: #fff;
  }
  .MuiOutlinedInput-root {
    &:hover {
      .MuiOutlinedInput-notchedOutline {
        transition: border 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
        border-color: #555973;
      }
    }
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: transparent;
  }
  .MuiFormLabel-root {
    color: #555973;
  }
  .MuiFormHelperText-root {
    position: absolute;
    bottom: -24px;
  }
`

const submitButtonStyle = css`
  width: 100%;
`

interface LoginFormProps {
  mutateUser: () => void
  onSnackbarOpen: (value: boolean) => void
}

const LoginForm: FC<LoginFormProps> = ({ mutateUser, onSnackbarOpen }) => {
  const [logInErrorMessage, setLogInErrorMessage] = useState<string>('')
  const { handleSubmit, control, formState: { errors }, getValues, clearErrors, setError } = useForm()
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()

  const validateOptions = {
    email: {
      required: 'email을 입력해주세요',
      isNotCorrect: '존재하지 않는 이메일입니다',
    },
    password: {
      required: 'password를 입력해주세요',
      isNotCorrect: '비밀번호가 틀렸습니다',
    },
  }

  const onSubmit = () => {
    const { email, password } = getValues()
    clearErrors(['email', 'password'])

    if (!email) {
      setError('email', {
        type: 'email',
        message: validateOptions.email.isNotCorrect,
      })
      emailRef.current?.focus()
      return false
    }

    if (logInErrorMessage === validateOptions.email.isNotCorrect) {
      setError('email', {
        type: 'email',
        message: validateOptions.email.isNotCorrect,
      })
      emailRef.current?.focus()
      return false
    }

    if (!password) {
      setError('password', {
        type: 'password',
        message: validateOptions.password.required,
      })
      passwordRef.current?.focus()
      return false
    }

    if (logInErrorMessage === validateOptions.password.isNotCorrect) {
      setError('password', {
        type: 'password',
        message: validateOptions.password.isNotCorrect,
      })
      passwordRef.current?.focus()
      return false
    }

    axios
      .post(
        '/api/users/login',
        { email, password },
        {
          withCredentials: true,
        },
      )
      .then((response: any) => {
        mutateUser()
        onSnackbarOpen(true)
      })
      .catch((error: any) => {
        setLogInErrorMessage(error.response.data)
      })
      .finally(() => { })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={formStyle}>
      <FormControl css={formControlStyle}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={onChange}
              value={value}
              label={"email"}
              inputRef={emailRef}
              onFocus={() => emailRef.current?.focus()}
              error={errors.email}
              helperText={errors.email ? errors.email.message : null}
              css={textfieldStyle}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={onChange}
              value={value}
              type="password"
              label={"password"}
              inputRef={passwordRef}
              onFocus={() => passwordRef.current?.focus()}
              error={errors.password}
              helperText={errors.password ? errors.password.message : null}
              css={textfieldStyle}
            />
          )}
        />
      </FormControl>
      <Button
        css={submitButtonStyle}
        type="submit">
        Login
      </Button>
    </form>
  )
}

export default LoginForm