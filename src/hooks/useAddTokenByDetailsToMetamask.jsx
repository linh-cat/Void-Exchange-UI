import { useCallback, useState } from "react"
import useAddToMetamask from "./useAddToMetamask"
import PropTypes from "prop-types"

const useAddTokenByDetailsToMetamask = () => {
  const addToMetamask = useAddToMetamask()
  const addToken = useCallback(
    (args) => {
      addToMetamask({ ...args })
    },
    [addToMetamask]
  )
  return { addToken }
}

useAddTokenByDetailsToMetamask.propTypes = {
  address: PropTypes.string,
  symbol: PropTypes.string,
  decimals: PropTypes.number,
  image: PropTypes.string
}

export default useAddTokenByDetailsToMetamask
