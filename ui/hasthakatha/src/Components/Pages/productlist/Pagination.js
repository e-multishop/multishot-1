import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight,faChevronLeft} from '@fortawesome/free-solid-svg-icons'

const Pagination = (props) => {

  const handlePageNumberChange = (pageNumber,e) => {
    props.setPageNumber(pageNumber);
    e.preventDefault();
    e.stopPropagation();
  }
  const totalPageCount = Math.ceil(parseInt(props.totalRecords)/props.pageSize);

  const handlePreviousPage = (e) => {
    if (props.pageNumber !== 1) {
      handlePageNumberChange(props.pageNumber-1, e)
    }
  }

  const handleNextPage = (e) => {
    if (props.pageNumber !== totalPageCount) {
      handlePageNumberChange(props.pageNumber+1, e)
    }
  }

  const showData = (count) => {
    const dataMap = [];
    const actualCount = Math.ceil(count);
    for(let i = 0; i < actualCount; i++) { 
      dataMap.push(1);
    }
    return (<>{dataMap.map((item, i) => <li key={i} className={props.pageNumber === i+1 ? "hs-active" : "waves-effect"}><a onClick={(e) => handlePageNumberChange(i+1, e)}>{i+1}</a></li>)}</>)
  }

  return (
    <ul className="pagination">
      <li className={props.pageNumber > 1 ? 'waves-effect' : 'disabled'}><a onClick={(e) => handlePreviousPage(e)}><FontAwesomeIcon icon={faChevronLeft} size="large"/></a></li>
      { showData(totalPageCount) }
      <li className={props.pageNumber===totalPageCount? 'disabled' : "waves-effect"}><a onClick={(e) => handleNextPage(e)}><FontAwesomeIcon icon={faChevronRight} size="large"/></a></li>
    </ul>
  );
}

export default Pagination;