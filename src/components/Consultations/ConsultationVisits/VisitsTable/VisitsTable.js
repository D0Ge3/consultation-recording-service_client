import React from 'react'

import { Table } from 'react-bootstrap'
import { VisitBtn } from './VisitBtn'

export const VisitsTable = ({ id_consultation, method_wrote, visits }) => {
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
    <Table striped bordered hover size="sm" className="mt-4" >
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
      <tbody>
        {visitsItems}
        {/* <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr>
        <tr>
          <td>783292</td>
          <td>Антонов Антон Антонович</td>
          <td>K32**</td>
          <td>0:06</td>
          <td>Да(заглушка)</td>
        </tr> */}
      </tbody>
    </Table>
  )
}
