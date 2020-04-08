import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  height 50px;
  width:  100%;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    margin: 0 10px;
    border-radius: 5px;
    background-color: white;
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

Buttons.propTypes = {
  onChangePokemon: PropTypes.func.isRequired,
}

export default Buttons
