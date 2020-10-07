import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getConsultations, takeTicket } from '../../redux/actions/consultationsActions'

import { Container } from 'react-bootstrap'
import { ConsultationsList } from '../../ui/ConsultationList/ConsultationsList'
import { Paginator } from '../../ui/Paginator/Paginator'

export const Schedule = () => {
  const dispatch = useDispatch()
  const consultations = useSelector((state) => state.consultations.consultations)
  const role = useSelector((state) => state.profile.role)
  const count = useSelector((state) => state.consultations.count)
  const page = useSelector((state) => state.consultations.page)
  const pageSize = 10
  useEffect(() => {
    changePage(1)
  }, [])
  const changePage = (page) => {
    dispatch(getConsultations('future', page, pageSize))
  }
  return (
    <Container className="mt-4">
      <h5 className="text-center">Расписание консультаций</h5>
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
      <ConsultationsList
        consultations={consultations}
        role={role}
        takeTicket={(id_consultation) => dispatch(takeTicket(id_consultation))}
      />
    </Container>
  )
}
