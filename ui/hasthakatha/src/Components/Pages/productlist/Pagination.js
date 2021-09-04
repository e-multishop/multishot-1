import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight,faChevronLeft} from '@fortawesome/free-solid-svg-icons'

const Pagination = () => {
  return (
    <ul className="pagination">
      <li className="disabled"><a href="#!"><FontAwesomeIcon icon={faChevronLeft} size="large"/></a></li>
      <li className="active"><a href="#!">1</a></li>
      <li className="waves-effect"><a href="#!">2</a></li>
      <li className="waves-effect"><a href="#!">3</a></li>
      <li className="waves-effect"><a href="#!">4</a></li>
      <li className="waves-effect"><a href="#!">5</a></li>
      <li className="waves-effect"><a href="#!"><FontAwesomeIcon icon={faChevronRight} size="large"/></a></li>
    </ul>
  );
}

export default Pagination;