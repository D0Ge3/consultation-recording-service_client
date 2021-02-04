import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../../redux/actions/authActions'

import { Navbar, Nav, Button } from 'react-bootstrap'

export const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)
  const history = useHistory()
  const location = useLocation()
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        ИТМО.Консультации
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/cabinet">
            Личный кабинет
          </Nav.Link>
          <Nav.Link as={Link} to="/schedule">
            Расписание
          </Nav.Link>
          <Nav.Link as={Link} to="/consultations">
            Консультации
          </Nav.Link>
          <Nav.Link as={Link} to="/settings">
            Настройки
          </Nav.Link>
        </Nav>
        {isAuth && (
          <Button onClick={() => dispatch(logout())} variant="danger">
            Выйти
          </Button>
        )}
        {!isAuth &&
          (location.pathname === '/registration' ? (
            <Button
              onClick={() => {
                history.push('/login')
              }}
              variant="primary"
            >
              Войти
            </Button>
          ) : (
            <Button
              onClick={() => {
                history.push('/registration')
              }}
              variant="primary"
            >
              Регистрация
            </Button>
          ))}
      </Navbar.Collapse>
    </Navbar>
  )
}
