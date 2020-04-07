import axios from 'axios'

import testPoke from './testPoke.json'
import testPokeSpecies from './testPokeSpecies.json'
import testPokeMoves from './testPokeMoves.json'

const useTestData = false // use test data to limit api calls
const baseUrl = 'https://pokeapi.co/api/v2'

export const getPokemonById = async id => {
  if (useTestData) {
    return testPoke
  }
  try {
    const response = await axios(`${baseUrl}/pokemon/${id}`)
    return response?.data
  } catch (error) {
    console.error(error)
  }
}

export const getPokemonSpeciesById = async id => {
  if (useTestData) {
    return testPokeSpecies
  }
  try {
    const response = await axios(`${baseUrl}/pokemon-species/${id}`)
    return response?.data
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
      const { name, pp } = response?.data
      return { name, pp }
    })
  } catch (error) {
    console.error(error)
  }
}

