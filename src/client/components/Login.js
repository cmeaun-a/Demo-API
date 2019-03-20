import React from 'react'
import { Form, Field as BasicField } from 'react-final-form'
import axios from 'axios'
import styled from 'styled-components'

const LoginBlock = styled.div`
  min-height: 480px;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 380px;
  padding: 60px 68px 40px;
  color: white;
`
const Button = styled.button`
  border-radius: 8px;
  margin: 24px 0 12px;
  padding: 16px;
  font-size: 16px;
`
const Field = styled(BasicField)`
  border-radius: 8px;
  padding: 16px;
  margin: 24px 0 12px;
`
const Login = () => (
  <Form
    onSubmit={async values => {
      await axios({
        method: 'post',
        url: '/auth/login',
        data: { ...values },
        withCredentials: true,
      })
      window.location = '/'
    }}
  >
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <LoginBlock>
          <h1>Sign In</h1>
          <Field name="email" component="input" placeholder="Email" />
          <Field
            name="password"
            component="input"
            placeholder="Password"
            type="password"
          />
          <Button type="submit">Sign In</Button>
        </LoginBlock>
      </form>
    )}
  </Form>
)

export default Login
