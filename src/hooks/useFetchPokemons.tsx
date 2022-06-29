import { useCallback, useEffect, useState } from "react"
import useFetchRequest from "./useFetchRequest"

export type PokemonsResult = {
  name: string;
  url: string
}

export type PokemonsResponseData = {
  count: number;
  next: string;
  previous: string;
  results: PokemonsResult[]
}



const DEFAULT_REQUEST_OFFSET_INCREMENTOR = 20
const DEFAULT_REQUEST_LIMIT_PER_PAGE = 20

const useFetchPokemons = (): [PokemonsResult[], {goToNextPage: () => void}] => {
  const [actualOffset, setActualOffset] = useState(0)
  const responseFromHttpRequest = useFetchRequest<PokemonsResponseData>({url: 'pokemon',config: {
    params: {
        offset: actualOffset, limit: DEFAULT_REQUEST_LIMIT_PER_PAGE,
      }
    }
  })

  const [pokemons, setPokemons] = useState<PokemonsResult[]>([])


  const goToNextPage = useCallback(() => {
    setActualOffset(prevPage => prevPage + DEFAULT_REQUEST_OFFSET_INCREMENTOR)
  }, [])

  const populateStateWithResponse = useCallback(async () => {
    const {data} = await responseFromHttpRequest ?? {}
    const {results} = data ?? {}

    setPokemons((prevData) => [...prevData, ...results])
  }, [actualOffset])


  useEffect(() => {
    populateStateWithResponse()
  }, [populateStateWithResponse])

  return [pokemons, {goToNextPage}]
}

export default useFetchPokemons