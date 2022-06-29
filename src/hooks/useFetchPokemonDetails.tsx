import { useCallback, useEffect, useState } from "react"
import useFetchRequest from "./useFetchRequest"

export type PokemonDetailsSprites = {
  other: {
    home: {
      front_default: string
    }
  }
}

export type PokemonDetailsData = {
  name: string;
  sprites: PokemonDetailsSprites
}

const useFetchPokemonsDetails = (url: string) => {
  const responseFromHttpRequest = useFetchRequest<PokemonDetailsData>({url: '', config: {baseURL: url}})
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsData>()

  const populateStateWithResponse = useCallback(async () => {
    const {data: dataFromRequest} = await responseFromHttpRequest

    setPokemonDetails(dataFromRequest)
  }, [url])

  useEffect(() => {
    populateStateWithResponse()
  }, [populateStateWithResponse])

  return pokemonDetails
}

export default useFetchPokemonsDetails