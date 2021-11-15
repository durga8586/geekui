import './index.css'

const PageNumbers = props => {
  const {number, onClickPageNumber, activeCurrentPage} = props

  const activeCurrentPageBg = activeCurrentPage
    ? 'coloured-bg'
    : 'non-coloured-bg'

  const onClickPageButton = () => {
    onClickPageNumber(number)
  }

  return (
    <li className="page-number">
      <button
        type="button"
        className={`page-button ${activeCurrentPageBg}`}
        onClick={onClickPageButton}
      >
        {number}
      </button>
    </li>
  )
}

export default PageNumbers
