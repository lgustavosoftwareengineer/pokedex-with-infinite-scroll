import { useRef } from "react"
import Api from "../configs/axiosConfig"

const useApi = () => {
  return useRef(Api).current
}

export default useApi