import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  getMyConsultations,
  deleteTicket,
  deleteConsultation,
  resetConsultations,
  setPageSize,
} from '../../redux/actions/consultationsActions'

import { Button, Container } from 'react-bootstrap'
import { Paginator } from '../../common/Paginator/Paginator'

import { ConsultationsList } from '../../common/ConsultationList/ConsultationsList'
import { Plus } from 'react-bootstrap-icons'
import { Loader } from '../../common/Loader/Loader'

export const ConsultationsWidget = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageSize(5))
    changePage(1)
    return () => dispatch(resetConsultations())
  }, [])
  const changePage = (page) => {
    dispatch(getMyConsultations('future', page))
  }
  const consultations = useSelector(
    (state) => state.consultations.consultations
  )
  const role = useSelector((state) => state.profile.role)
  const count = useSelector((state) => state.consultations.count)
  const page = useSelector((state) => state.consultations.page)
  const isLoading = useSelector((state) => state.app.isLoading)
  const pageSize = useSelector((state) => state.consultations.pageSize)
  const deleteItem = (id_consultation) => {
    if (role === 'student') {
      dispatch(deleteTicket(id_consultation))
    } else if (role === 'teacher') {
      dispatch(deleteConsultation(id_consultation))
    }
  }
  const onClickPlus = () => {
    if (role === 'student') {
      history.push('schedule')
    } else if (role === 'teacher') {
      history.push('consultation/create')
    }
  }
  const btnStyle = {
    borderRadius: '50%',
    height: '35px',
    width: '35px',
    position: 'relative',
    outline: 'none',
    border: 'none',
  }
  const plusIconStyle = {
    position: 'absolute',
    top: '2px',
    right: '2px',
  }
  return (
    <>
      <div className="d-flex justify-content-between mb-1">
        <h4>Мои консультации</h4>
        <Button variant="outline-success" style={btnStyle}>
          <Plus
            style={plusIconStyle}
            onClick={onClickPlus}
            width="30px"
            height="30px"
          />
        </Button>
      </div>

      {isLoading ? (
        <Container className="mt-4" style={{ width: '180px' }}>
          <Loader />
        </Container>
      ) : (
        <ConsultationsList
          deleteItem={deleteItem}
          edit={(id) => history.push(`consultation/${id}/edit`)}
          consultations={consultations}
          type="widget"
          role={role}
        />
      )}
      <div className="mt-3">
        <Paginator
          onPageChange={changePage}
          page={page}
          count={count}
          pagesCount={Math.ceil(count / pageSize)}
          pageSize={pageSize}
          portionSize={10}
        />
      </div>
    </>
  )
}
