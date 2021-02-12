import React from 'react'
import { useDispatch } from 'react-redux'

import { updateVisit } from '../../redux/actions/visitsActions'

import { Dropdown, DropdownButton } from 'react-bootstrap'

export const VisitBtn = ({ is_visit, id_wrote }) => {
  const dispatch = useDispatch()
  return (
    <DropdownButton
      variant={is_visit ? 'success' : 'danger'}
      title={is_visit ? 'Да' : 'Нет'}
      drop="down"
      size="sm"
    >
      <Dropdown.Item onClick={() => dispatch(updateVisit(id_wrote, !is_visit))}>
        {is_visit ? 'Нет' : 'Да'}
      </Dropdown.Item>
    </DropdownButton>
  )
}
