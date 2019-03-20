import React from 'react'
import { NavLink as BaseLink, Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { Button as BaseButton } from '@material-ui/core'
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import SvgIcon from '@material-ui/core/SvgIcon'
import * as routePaths from 'client/utils/routePaths'

const Exit = props => (
  <svg width={24} height={24} {...props}>
    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5a2 2 0 0 0-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
)

const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  justify-content: space-between;
  align-items: center;
  position: fixed;
  padding: 0 20px;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 20rem;
  z-index: 999;
  background-color: #fff;
  text-align: center;
  box-shadow: 0 7px 20px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.2);
`

const Button = styled(BaseButton)`
  display: flex;
  justify-content: end;
  justify-items: end;
  margin: 30px;
`

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  margin: 0;
  list-style: none;
`

const NavLink = styled(BaseLink)`
  margin: 20px;
  color: #dbe8d4;

  &.active {
    color: #73cca8;
  }
  :hover {
    color: #73cca8;
  }
`

const HomeIcon = props => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
)

const NavigatorBar = () => (
  <NavBar>
    <Link to={routePaths.home()}>
      <HomeIcon
        color="primary"
        fontSize="large"
        component={svgProps => (
          <svg {...svgProps}>
            <defs>
              <linearGradient id="gradient1">
                <stop offset="30%" stopColor={blue[400]} />
                <stop offset="70%" stopColor={red[400]} />
              </linearGradient>
            </defs>
            {React.cloneElement(svgProps.children[0], {
              fill: 'url(#gradient1)',
            })}
          </svg>
        )}
      />
    </Link>
    <Ul>
      <NavLink to={routePaths.restaurant('dsd')}>Dornsokdee</NavLink>
      <NavLink to={routePaths.restaurant('lm')}>La Memoire</NavLink>
    </Ul>
    <Button
      onClick={async () => {
        localStorage.clear()
        await axios.get('/auth/logout', {
          withCredentials: true,
        })
        window.location = '/'
      }}
    >
      <Exit />
    </Button>
  </NavBar>
)

export default NavigatorBar
