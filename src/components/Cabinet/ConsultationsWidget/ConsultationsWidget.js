import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getMyConsultations, deleteTicket, deleteConsultation } from '../../../redux/actions/consultationsActions'
import { ConsultationsList } from '../../../ui/ConsultationList/ConsultationsList'

export const ConsultationsWidget = () => {
  const dispatch = useDispatch()
  const consultations = useSelector((state) => state.consultations.consultations)
  const role = useSelector((state) => state.profile.role)
  useEffect(() => {
    dispatch(getMyConsultations('future'))
  }, [])
  const deleteItem = (id_consultation) => {
    if (role === 'student') {
      dispatch(deleteTicket(id_consultation))
    } else if (role === 'teacher') {
      dispatch(deleteConsultation(id_consultation))
    }
  }

  return (
    <>
      <h4>Мои консультации</h4>
      <ConsultationsList
        deleteItem={deleteItem}
        edit={() => {}}
        consultations={consultations}
        type="widget"
        role={role}
      />
    </>
  )
}
