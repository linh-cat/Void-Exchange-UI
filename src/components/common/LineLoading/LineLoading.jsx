import React from "react"
import cx from "classnames"

import "./LineLoading.css"

const LineLoading = ({ isLoading }) => {
  return <div className={cx({ "loader-line": isLoading })}></div>
}

export default LineLoading
