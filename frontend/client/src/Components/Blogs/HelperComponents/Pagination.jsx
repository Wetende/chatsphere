import React from 'react'

//Libraries
import { Link } from "react-router-dom"

const Pagination = () => {
  return (
    <ul className="pagination pagination-style-01 font-sans font-medium items-center">
      <li className="page-item">
        <Link aria-label="link" className="page-link" to="#">
          <i className="feather-arrow-left text-lg"></i>
        </Link>
      </li>
      <li className="page-item">
        <Link aria-label="link" className="page-link" to="#"> 01 </Link>
      </li>
      <li className="page-item active">
        <Link aria-label="link" className="page-link" to="#"> 02 </Link>
      </li>
      <li className="page-item">
        <Link aria-label="link" className="page-link" to="#"> 03 </Link>
      </li>
      <li className="page-item">
        <Link aria-label="link" className="page-link" to="#"> 04 </Link>
      </li>
      <li className="page-item">
        <Link aria-label="link" className="page-link" to="#">
          <i className="feather-arrow-right text-lg"></i>
        </Link>
      </li>
    </ul>
  )
}

export default Pagination