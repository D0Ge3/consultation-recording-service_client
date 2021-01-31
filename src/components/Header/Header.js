import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../../redux/actions/authActions'

import { Navbar, Nav, Button } from 'react-bootstrap'

export const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)
  const history = useHistory()
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">ИТМО.Консультации</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/cabinet">Личный кабинет</Nav.Link>
          <Nav.Link as={Link} to="/schedule">Расписание</Nav.Link>
          <Nav.Link as={Link} to="/consultations">Консультации</Nav.Link>
          <Nav.Link as={Link} to="/settings">Настройки</Nav.Link>
        </Nav>
        {isAuth && (
          <Button onClick={() => dispatch(logout())} variant="danger">
            Выйти
          </Button>
        )}
        {!isAuth && (
          <Button
            onClick={() => {
              history.push('/registration')
            }}
            variant="primary"
          >
            Регистрация
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}
