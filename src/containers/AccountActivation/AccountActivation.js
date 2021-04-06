import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { activateAccount } from '../../redux/actions/authActions'
import { Container } from 'react-bootstrap'
import { Loader } from '../../common/Loader/Loader'

export const AccountActivation = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.auth.isLoading)
  const isActivate = useSelector((state) => state.auth.isActivateAccount)
  const params = useParams()
  useEffect(() => {
    const { uid, token } = params
    dispatch(activateAccount(uid, token))
    // eslint-disable-next-line
  }, [])
  return (
    <Container className="mt-4">
      {isLoading ? (
        <Container className="mt-4" style={{ width: '180px' }}>
          <Loader />
        </Container>
      ) : isActivate ? (
        <h3 className="text-success">Аккаунт успешно активирован!</h3>
      ) : (
        <h3 className="text-danger">
          При активации аккаунта произошла ошибка!
        </h3>
      )}
    </Container>
  )
}
