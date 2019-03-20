import React from 'react'
import { Link } from 'react-router-dom'
import UserContext from 'client/utils/UserContext'
import Login from 'client/components/Login'
import styled from 'styled-components'
import { Button as BaseButton } from '@material-ui/core'

import * as routePaths from 'client/utils/routePaths'

const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const LoginWrapper = styled.div`
  min-height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 0;
`
const LoginBackground = styled.div`
  display: block;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  position: absolute;
  width: 100%;
  z-index: -1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('https://res.cloudinary.com/djxpw90hu/image/upload/v1542489763/dsd/login.jpg');
`

const LoginBody = styled.div`
  margin: auto;
  min-height: 100vh;
  background-color: transparent;
  max-width: 450px;
  padding: 100px 0;
`

const Button = styled(BaseButton)`
  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.5;

  &:hover {
    z-index: 1;
    opacity: 1;
  }
`

const images = [
  {
    url:
      'https://res.cloudinary.com/djxpw90hu/image/upload/v1542494548/dsd/dsd.jpg',
    title: 'Dornsokdee',
    width: '100%',
    path: 'dsd',
  },
  {
    url:
      'https://res.cloudinary.com/djxpw90hu/image/upload/v1542494422/dsd/laMemoire.jpg',
    title: 'La Memoire',
    width: '100%',
    path: 'lm',
  },
]
const Home = () => (
  <UserContext.Consumer>
    {({ user }) => (
      <>
        {user.id ? (
          <>
            <HomeWrapper>
              {images.map(image => (
                <Link
                  to={routePaths.restaurant(image.path)}
                  style={{ height: '50%' }}
                >
                  <Button
                    key={image.title}
                    style={{ backgroundImage: `url(${image.url})` }}
                    variant="outlined"
                  />
                </Link>
              ))}
            </HomeWrapper>
          </>
        ) : (
          <LoginWrapper>
            <LoginBackground />
            <LoginBody>
              <Login />
            </LoginBody>
          </LoginWrapper>
        )}
      </>
    )}
  </UserContext.Consumer>
)

export default Home
