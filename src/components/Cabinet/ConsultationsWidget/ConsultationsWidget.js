import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  getMyConsultations,
  deleteTicket,
  deleteConsultation,
} from '../../../redux/actions/consultationsActions'

import { Button } from 'react-bootstrap'

import { ConsultationsList } from '../../../ui/ConsultationList/ConsultationsList'
import { Plus } from 'react-bootstrap-icons'

export const ConsultationsWidget = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMyConsultations('future'))
  }, [])
  const consultations = useSelector((state) => state.consultations.consultations)
  const role = useSelector((state) => state.profile.role)
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
      <ConsultationsList
        deleteItem={deleteItem}
        edit={(id) => history.push(`consultation/${id}/edit`)}
        consultations={consultations}
        type="widget"
        role={role}
      />
    </>
  )
}
