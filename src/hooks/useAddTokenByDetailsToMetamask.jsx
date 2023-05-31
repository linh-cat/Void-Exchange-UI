import { useCallback, useState } from "react"
import useAddToMetamask from "./useAddToMetamask"
import PropTypes from "prop-types"
import { toast } from "react-hot-toast"

const useAddTokenByDetailsToMetamask = () => {
  const [success, setSuccess] = useState()
  const addToMetamask = useAddToMetamask()
  const addToken = useCallback(
    (args) => {
      addToMetamask({ ...args, onSuccess: setSuccess })
    },
    [addToMetamask]
  )
  if (success) toast.success("Token added successfully!")
  return { addToken }
}

useAddTokenByDetailsToMetamask.propTypes = {
  address: PropTypes.string,
  symbol: PropTypes.string,
  decimals: PropTypes.number,
  image: PropTypes.string
}

export default useAddTokenByDetailsToMetamask
