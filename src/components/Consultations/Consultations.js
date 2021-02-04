import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ConsultationsList } from '../../ui/ConsultationList/ConsultationsList'
import {
  getMyConsultations,
  resetConsultations,
} from '../../redux/actions/consultationsActions'

import { Container, ButtonGroup, Button } from 'react-bootstrap'
import { Paginator } from '../../ui/Paginator/Paginator'
import { Loader } from '../../ui/Loader/Loader'

export const Consultations = () => {
  const dispatch = useDispatch()
  let [mode, setMode] = useState('future')
  const role = useSelector((state) => state.profile.role)
  const consultations = useSelector(
    (state) => state.consultations.consultations
  )
  const count = useSelector((state) => state.consultations.count)
  const page = useSelector((state) => state.consultations.page)
  const isLoading = useSelector((state) => state.app.isLoading)
  const pageSize = 10
  useEffect(() => {
    changePage(1)
    return () => dispatch(resetConsultations())
  }, [])
  useEffect(() => changePage(1), [mode])
  const changePage = (page) => {
    dispatch(getMyConsultations(mode, page, pageSize))
  }
  const changeMode = (mode) => {
    setMode(mode)
  }

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
      <div className="mt-3 mb-3">
        <Paginator
          onPageChange={changePage}
          page={page}
          count={count}
          pagesCount={Math.ceil(count / pageSize)}
          pageSize={pageSize}
          portionSize={10}
        />
      </div>
      {isLoading && (
        <Container className="mt-4" style={{ width: '180px' }}>
          <Loader />
        </Container>
      )}
      {!isLoading && (
        <ConsultationsList
          type="info"
          role={role}
          consultations={consultations}
        />
      )}
    </Container>
  )
}
