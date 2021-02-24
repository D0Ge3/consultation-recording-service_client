import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'

import s from './Paginator.module.css'

export const Paginator = ({
  onPageChange,
  page,
  count,
  pagesCount,
  pageSize,
  portionSize,
}) => {
  let pages = Array.from({ length: pagesCount }, (v, k) => k + 1)
  let maxPortion = pagesCount > 10 ? Math.ceil(pagesCount / portionSize) : 1
  let [portionNumber, setPortionNumber] = useState(1)

  const decPortion = () => {
    setPortionNumber(portionNumber - 1)
  }

  const incPortion = () => {
    setPortionNumber(portionNumber + 1)
  }

  let toggleFirstLastPage = (page, portion) => {
    onPageChange(page)
    setPortionNumber(portion)
  }

  let endPage = pagesCount > 10 ? portionNumber * pageSize : pagesCount
  let startPage = pagesCount > 10 ? endPage - (pageSize - 1) : 1

  let showPages = pages
    .filter((p) => p >= startPage && p <= endPage)
    .map((p) => {
      return (
        <Pagination.Item
          active={p === page}
          key={p}
          onClick={() => onPageChange(p)}
        >
          {p}
        </Pagination.Item>
      )
    })

  let firstPageBtn =
    portionNumber !== 1 ? (
      <>
        <Pagination.Item onClick={() => toggleFirstLastPage(1, 1)}>
          1
        </Pagination.Item>
        {pagesCount > 10 && <Pagination.Ellipsis onClick={decPortion} />}
      </>
    ) : null

  let lastPageBtn =
    portionNumber !== maxPortion ? (
      <>
        {pagesCount > 10 && <Pagination.Ellipsis onClick={incPortion} />}
        <Pagination.Item
          onClick={() =>
            toggleFirstLastPage(pages[pages.length - 1], maxPortion)
          }
        >
          {pages[pages.length - 1]}
        </Pagination.Item>
      </>
    ) : null

  return count <= pageSize ? null : (
    <Pagination className={s.paginator}>
      <Pagination.Prev
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      />
      {firstPageBtn}
      {showPages}
      {lastPageBtn}
      <Pagination.Next
        disabled={page === pagesCount}
        onClick={() => onPageChange(page + 1)}
      />
    </Pagination>
  )
}
