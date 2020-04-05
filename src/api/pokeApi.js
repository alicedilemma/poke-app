import axios from 'axios'

import testPoke from './testPoke.json'

const useTestData = true // use test data to limit api calls
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

