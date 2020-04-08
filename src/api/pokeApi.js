import axios from 'axios'

import testPoke from './testPoke.json'
import testPokeSpecies from './testPokeSpecies.json'
import testPokeMoves from './testPokeMoves.json'

const useTestData = false // use test data to limit api calls
const baseUrl = 'https://pokeapi.co/api/v2'

export const getPokemonById = async id => {
  if (useTestData) {
    return {
      ...testPoke,
      ...testPokeSpecies,
    }
  }
  try {
    const requests = [
      axios.get(`${baseUrl}/pokemon/${id}`),
      axios.get(`${baseUrl}/pokemon-species/${id}`)
    ]
    const responses = await Promise.all(requests)
    const data = responses
      .map(response => response && response.data)
      .reduce((result, currentValue) => ({ ...result, ...currentValue }), {})
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getMoves = async urls => {
  if (useTestData) {
    return testPokeMoves
  }
  try {
    const requests = urls.map(url => axios.get(url))
    const responses = await Promise.all(requests)
    return responses.map(response => {
      const { name, pp } = response && response.data
      return { name, pp }
    })
  } catch (error) {
    console.error(error)
  }
}

