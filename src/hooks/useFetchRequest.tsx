import { AxiosRequestConfig, AxiosResponse } from "axios"
import useApi from "./useApi"


export type useFetchRequestParams<D> = {
  url: string
  config?: AxiosRequestConfig<D> | undefined
}

export type UseFetchRequestResponse<T, D> = Promise<AxiosResponse<T, D>>
export type UseFetchRequest<T, D> =  UseFetchRequestResponse<T, D>

const useFetchRequest = <T extends any, D = any>({url, config = {}}: useFetchRequestParams<D>): UseFetchRequest<T, D> => {
  const {get} = useApi()
  const responseFromHttpRequest = get<T, AxiosResponse<T, D>, D>(url, config)

  return responseFromHttpRequest
}

export default useFetchRequest
