import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Container, ButtonGroup, Button } from 'react-bootstrap'
import { ConsultationsList } from '../../ui/ConsultationList/ConsultationsList'
import { getMyConsultations } from '../../redux/actions/consultationsActions'

export const Consultations = () => {
  const dispatch = useDispatch()
  let [mode, setMode] = useState('')
  const role = useSelector((state) => state.profile.role)
  const consultations = useSelector((state) => state.consultations.consultations)

  const changeMode = (mode) => {
    setMode(mode)
    dispatch(getMyConsultations(mode))
  }
  useEffect(() => {
    changeMode('future')
  }, [])
  return (
    <Container className="mt-4">
      <ButtonGroup
        className="d-block mr-auto ml-auto mb-2"
        style={{ width: '237px' }}
      >
        <Button
          onClick={() => changeMode('future')}
          variant={mode === 'future' ? 'info' : 'outline-secondary'}
        >
          Актуальные
        </Button>
        <Button
          onClick={() => changeMode('latest')}
          variant={mode === 'latest' ? 'info' : 'outline-secondary'}
        >
          Прошедшие
        </Button>
      </ButtonGroup>
      <ConsultationsList
        type="info"
        role={role}
        consultations={consultations}
      />
    </Container>
  )
}
