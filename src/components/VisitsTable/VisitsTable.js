import React from 'react'

import { Table } from 'react-bootstrap'
import { VisitBtn } from './VisitBtn'

export const VisitsTable = ({ method_wrote, visits }) => {
  const visitsItems = visits.map((v) => (
    <tr key={v.id_wrote}>
      <td>{v.employee_number}</td>
      <td>{v.student_fio}</td>
      <td>{v.group}</td>
      {method_wrote === 'по времени' && <td>{v.time}</td>}
      <td>
        <VisitBtn is_visit={v.is_visit} id_wrote={v.id_wrote} />
      </td>
    </tr>
  ))
  return (
    <>
      {visits.length > 0 ? (
        <Table striped bordered hover size="sm" className="mt-4">
          <thead>
            <tr>
              <th>Таб. номер</th>
              <th>ФИО</th>
              <th>Группа</th>
              {method_wrote === 'по времени' && <th>Время</th>}
              {/* ниже style={{overflowWrap: 'anywhere'}} мб после добавления кнопки булет ок */}
              <th>Присутствие</th>
            </tr>
          </thead>
          <tbody>{visitsItems}</tbody>
        </Table>
      ) : (
        <p className="text-danger">Ни один студент еще не записался!</p>
      )}
    </>
  )
}
