import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight,faChevronLeft} from '@fortawesome/free-solid-svg-icons'

const Pagination = (props) => {

  const handlePageNumberChange = (pageNumber,e) => {
    props.setPageNumber(pageNumber);
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <ul className="pagination">
      <li className="disabled"><a onClick={() => handlePageNumberChange(prop.pageNumber-1, e)}><FontAwesomeIcon icon={faChevronLeft} size="large"/></a></li>
      <li className={props.pageNumber === 1 ? "active" : "waves-effect"}><a onClick={() => handlePageNumberChange(1, e)}>1</a></li>
      <li className={props.pageNumber === 2 ? "active" : "waves-effect"}><a onClick={(e) => handlePageNumberChange(2, e)}>2</a></li>
      <li className={props.pageNumber === 3 ? "active" : "waves-effect"} onClick={(e) => handlePageNumberChange(3, e)}><a >3</a></li>
      <li className={props.pageNumber === 4 ? "active" : "waves-effect"}><a onClick={(e) => handlePageNumberChange(4, e)}>4</a></li>
      <li className={props.pageNumber === 5 ? "active" : "waves-effect"}><a onClick={(e) => handlePageNumberChange(5, e)}>5</a></li>
      <li className="waves-effect"><a onClick={(e) => handlePageNumberChange(prop.pageNumber+1, e)}><FontAwesomeIcon icon={faChevronRight} size="large"/></a></li>
    </ul>
  );
}

export default Pagination;