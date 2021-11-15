import {RiArrowRightSLine, RiArrowLeftSLine} from 'react-icons/ri'
import {MdFirstPage, MdLastPage} from 'react-icons/md'

import PageNumbers from '../pageNumbers'

import './index.css'

const Pagination = props => {
  const {totalUsers, paginate, currentPage, allDeleteUsers} = props
  const usersPerPage = 10
  const numberOfPages = Math.ceil(totalUsers / usersPerPage)
  const pageNumbers = []

  const onClickPageNumber = number => {
    paginate(number)
  }

  const onClickNavToFirstPage = () => {
    paginate(pageNumbers[0])
  }

  const onClickNavToLastPage = () => {
    paginate(pageNumbers.length)
  }

  const onClickNavToPrevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1)
    } else {
      paginate(currentPage)
    }
  }

  const onClickNavToNextPage = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1)
    } else {
      paginate(currentPage)
    }
  }

  const onClickAllDelete = () => {
    allDeleteUsers()
  }

  for (let i = 1; i <= numberOfPages; i += 1) {
    pageNumbers.push(i)
  }
  return (
    <div className="page-navigation">
      <button
        type="button"
        className="all-delete-button"
        onClick={onClickAllDelete}
      >
        Delete All
      </button>
      <div className="left-nav-buttons">
        <button
          type="button"
          className="left-page-button"
          onClick={onClickNavToFirstPage}
        >
          <MdFirstPage />
        </button>
        <button
          type="button"
          className="left-page-button"
          onClick={onClickNavToPrevPage}
        >
          <RiArrowLeftSLine />
        </button>
      </div>

      <ul className="pagination-container">
        {pageNumbers.map(number => (
          <PageNumbers
            number={number}
            key={number}
            onClickPageNumber={onClickPageNumber}
            activeCurrentPage={currentPage === number}
          />
        ))}
      </ul>
      <div className="left-nav-buttons">
        <button
          type="button"
          className="left-page-button"
          onClick={onClickNavToNextPage}
        >
          <RiArrowRightSLine />
        </button>
        <button
          type="button"
          className="left-page-button"
          onClick={onClickNavToLastPage}
        >
          <MdLastPage />
        </button>
      </div>
    </div>
  )
}

export default Pagination
