import React, { FC, useState, useRef } from 'react'
import axios from 'axios'
import { css } from '@emotion/core'
import { Controller, useForm } from "react-hook-form"
import { FormControl, TextField, Button, Snackbar, Slide } from '@material-ui/core'

const rootStyle = css`
  width: 600px;
  height: 660px;
  padding: 80px 40px; 
  background-color: #282C44;
  border-radius: 10px;
`

const titleStyle = css`
  font-size: 24px;
  font-weight: 800;
  font-family: system-ui;
  color: #fff;
  text-align: center;
  letter-spacing: 1.25;
`

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
  /* .MuiButton-root {
    background-color: #476EEE;
    font-weight: 600;
    color: #fff;
  } */
`

const Signup: FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [alreadyUser, setAlreadyUser] = useState<boolean>(false)
  const { handleSubmit, control, formState: { errors }, getValues, clearErrors, setError } = useForm()
  const emailRef = useRef<HTMLInputElement>()
  const nicknameRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const passwordcheckRef = useRef<HTMLInputElement>()

  const validateOptions = {
    email: {
      required: 'email을 입력해주세요',
      regex: '올바른 email 형식을 입력해주세요.',
    },
    nickname: {
      required: 'nickname을 입력해주세요',
      regex: 'nickname은 한글, 영문, 숫자만 가능하며 2-10자리만 가능합니다.'
    },
    password: {
      required: 'password를 입력해주세요',
      regex: 'password은 8~10자 영문, 숫자 조합만 가능합니다.'
    },
    passwordcheck: {
      required: 'passwordcheck를 입력해주세요',
      notMatch: '비밀번호가 일치하지 않습니다.'
    },
  }

  const onSubmit = () => {
    const { email, nickname, password, passwordcheck } = getValues()
    clearErrors(['email', 'nickname', 'password', 'passwordcheck'])

    if (!email) {
      setError('email', {
        type: 'email',
        message: validateOptions.email.required,
      })
      emailRef.current?.focus()
      return false
    }

    const EMAIL_REGEX = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!email.match(EMAIL_REGEX)) {
      setError('email', {
        type: 'email',
        message: validateOptions.email.regex,
      })
      emailRef.current?.focus()
      return false
    }

    const NICKNAME_REGEX = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;
    if (!nickname.match(NICKNAME_REGEX)) {
      setError('nickname', {
        type: 'nickname',
        message: validateOptions.nickname.regex,
      })
      nicknameRef.current?.focus()
      return false
    }

    const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    if (password.match(PASSWORD_REGEX)) {
      setError('password', {
        type: 'password',
        message: validateOptions.password.regex,
      })
      passwordRef.current?.focus()
      return false
    }

    if (password !== passwordcheck) {
      setError('passwordcheck', {
        type: 'passwordcheck',
        message: validateOptions.passwordcheck.notMatch,
      })
      passwordcheckRef.current?.focus()
      return false
    }

    axios.post('/api/users', {
      email, nickname, password
    })
      .then((response: any) => {
        console.log(response)
        setSnackbarOpen(true)
      })
      .catch((error: any) => {
        console.log(error)
        emailRef.current?.focus()
        setAlreadyUser(true)
        setSnackbarOpen(true)
      })
      .finally(() => { })
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <div css={rootStyle}>
      <div css={titleStyle}>Signup To Account</div>
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
            name="nickname"
            render={({ field: { onChange, value } }) => (
              <TextField
                id="outlined-basic"
                variant="outlined"
                onChange={onChange}
                value={value}
                label={"nickname"}
                inputRef={nicknameRef}
                onFocus={() => nicknameRef.current?.focus()}
                error={errors.nickname}
                helperText={errors.nickname ? errors.nickname.message : null}
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
          <Controller
            control={control}
            name="passwordcheck"
            render={({ field: { onChange, value } }) => (
              <TextField
                id="outlined-basic"
                variant="outlined"
                onChange={onChange}
                value={value}
                type="password"
                label={"passwordcheck"}
                inputRef={passwordcheckRef}
                onFocus={() => passwordcheckRef.current?.focus()}
                error={errors.passwordcheck}
                helperText={errors.passwordcheck ? errors.passwordcheck.message : null}
                css={textfieldStyle}
              />
            )}
          />
        </FormControl>
        <Button
          css={submitButtonStyle}
          type="submit">
          Signup
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        TransitionComponent={Slide}
        message={alreadyUser ? <span style={{ color: '#F9446C' }}>이미 가입된 유저입니다.</span> : <span>회원가입 성공!</span>}
        key='slide'
      />
    </div>
  )
}

export default Signup