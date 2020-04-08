import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: auto;
  width:  50%;
  text-align: center;
  button {
    margin: 0 10px;
  }
`

const Buttons = ({ onChangePokemon }) => {
  const handleNextPokemon = () => onChangePokemon(1)
  const handlePrevPokemon = () => onChangePokemon(-1)
 
  return (
    <Container>
      <button onClick={handlePrevPokemon}>
        &lt;= prev pokemon
      </button>
      <button onClick={handleNextPokemon}>
        next pokemon =&gt;
      </button>
    </Container>
  )
}

export default Buttons
